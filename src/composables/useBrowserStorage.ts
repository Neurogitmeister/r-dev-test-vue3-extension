import { ref, watch, nextTick } from "vue"
import { ILocalStorage, ISyncStorage } from "@/utils/storage"

function isObject(value: unknown): boolean {
  return value instanceof Object && !Array.isArray(value)
}

function checkSameType(defaultValue: unknown, value: unknown): boolean {
  // Check if the value type is the same type as the default value or null
  // there are only strings, booleans, nulls and arrays as types left
  return (
    typeof value === typeof defaultValue &&
    Array.isArray(value) == Array.isArray(defaultValue)
  )
}

function mergeDefaults(
  defaults: unknown,
  source: unknown,
): typeof defaults & typeof source {
  type Obj = Record<string, unknown>

  if (isObject(defaults) && isObject(source)) {
    const output = { ...(defaults as Obj) }
    Object.keys({
      ...(defaults as Obj),
      ...(source as Obj),
    }).forEach((key) => {
      const defaultValue = (defaults as Obj)[key]
      const sourceValue = (source as Obj)[key]
      if (defaultValue === undefined) {
        output[key] = sourceValue
      } else {
        output[key] = mergeDefaults(defaultValue, sourceValue)
      }
    })
    return output
  } else if (checkSameType(defaults, source)) {
    return source
  } else {
    return defaults || source
  }
}

function useBrowserStorage<
  S,
  K extends string & keyof S,
  D extends NonNullable<S[K]> | undefined,
>(
  key: K,
  defaultValue?: D,
  storageType: "local" | "sync" | "session" = "local",
) {
  type WithDefault<T> = D extends undefined ? T : NonNullable<T>

  const data = ref(defaultValue as WithDefault<S[K]>)
  // Blocking setting storage if it is updating from storage
  let isUpdatingFromStorage = true
  // Initialize storage with the value from chrome.storage
  const promise = new Promise((resolve) => {
    chrome.storage[storageType].get(key, async (result) => {
      const value = result?.[key]
      if (value !== undefined) {
        if (!defaultValue) {
          data.value = value
        } else if (isObject(defaultValue) && isObject(value)) {
          data.value = mergeDefaults(defaultValue, value)
        } else if (checkSameType(defaultValue, value)) {
          data.value = value
        } else {
          data.value = defaultValue
        }
      }
      await nextTick()
      isUpdatingFromStorage = false
      resolve(true)
    })
  })

  // Watch for changes in the storage and update chrome.storage
  watch(
    data,
    (newValue) => {
      if (!isUpdatingFromStorage) {
        if (!defaultValue || checkSameType(defaultValue, newValue)) {
          chrome.storage[storageType].set({ [key]: toRaw(newValue) })
        } else {
          console.error("not updating " + key + ": type mismatch")
        }
      }
    },
    { deep: true, flush: "post" },
  )
  // Add the onChanged listener here
  chrome.storage[storageType].onChanged.addListener(async function (changes) {
    if (changes?.[key]) {
      isUpdatingFromStorage = true
      const { oldValue, newValue } = changes[key]
      data.value =
        newValue === undefined || newValue === null
          ? newValue || defaultValue
          : newValue
      await nextTick()
      isUpdatingFromStorage = false
    }
  })
  return { data, promise }
}

export function useBrowserSyncStorage<
  K extends string & keyof ISyncStorage,
  D extends NonNullable<ISyncStorage[K]> | undefined,
>(key: K, defaultValue: D) {
  return useBrowserStorage<ISyncStorage, K, D>(key, defaultValue, "sync")
}

export function useBrowserLocalStorage<
  K extends string & keyof ILocalStorage,
  D extends NonNullable<ILocalStorage[K]> | undefined,
>(key: K, defaultValue?: D) {
  return useBrowserStorage<ILocalStorage, K, D>(key, defaultValue, "local")
}
