import { ref, watch, nextTick } from "vue"
import { ILocalStorage, ISyncStorage } from "@/utils/storage"

function isObject(value: unknown): boolean {
  return value !== null && value instanceof Object && !Array.isArray(value)
}

function checkType(defaultValue: unknown, value: unknown): boolean {
  // Check if the value type is the same type as the default value or null
  // there are only strings, booleans, nulls and arrays as types left
  return (
    (typeof value === typeof defaultValue &&
      Array.isArray(value) == Array.isArray(defaultValue)) ||
    value === null
  )
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mergeDeep(defaults: any, source: any): any {
  // Merge the default options with the stored options
  const output = { ...defaults } // Start with defaults

  Object.keys(defaults).forEach((key) => {
    const defaultValue = defaults[key]
    const sourceValue = source?.[key]

    if (isObject(defaultValue) && sourceValue != null) {
      // Recursively merge nested objects
      output[key] = mergeDeep(defaultValue, sourceValue)
    } else if (checkType(defaultValue, sourceValue)) {
      output[key] = sourceValue
    } else {
      // If the type is different, use the default value
      output[key] = defaultValue
      console.info("Type mismatch", key, sourceValue)
    }
  })

  return output
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
      if (result?.[key] !== undefined) {
        if (!defaultValue) {
          data.value = result[key]
        } else if (isObject(defaultValue) && isObject(result[key])) {
          data.value = mergeDeep(defaultValue, result[key])
        } else if (checkType(defaultValue, result[key])) {
          data.value = result[key]
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
        if (checkType(defaultValue, newValue)) {
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
      data.value = newValue
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
