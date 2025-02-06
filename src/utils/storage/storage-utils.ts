/* eslint-disable @typescript-eslint/no-explicit-any */
// (arbitrary types storage utils lib, must use "any")

import {
  StorageArea,
  StorageDataType,
  StorageGetter,
  StorageSetter,
  StorageRemover,
} from "./storage-types"

// Safari skips writes with 'undefined' and 'null', write '' instead
const EMPTY_VALUE = "" as const

const shouldNormalize = (value: any) => value === undefined || value === null

const normalizeStorageValue = (value: any) =>
  shouldNormalize(value) ? EMPTY_VALUE : value

const normalizeStorage = (items: StorageDataType): Partial<StorageDataType> =>
  Object.entries(items).reduce((acc, [key, value]) => {
    if (shouldNormalize(value)) {
      Object.assign(acc, { [key]: EMPTY_VALUE })
    }
    return acc
  }, items)

const restoreNormalizedValue = (value: any) =>
  value === EMPTY_VALUE ? undefined : value

const restoreNormalizedStorage = (
  data: StorageDataType,
): Partial<StorageDataType> =>
  Object.entries(data).reduce<Partial<StorageDataType>>((acc, [key, value]) => {
    if (value === EMPTY_VALUE) {
      Object.assign(acc, { [key]: undefined })
    }
    return acc
  }, data)

async function getItems(keys: string | string[], area: StorageArea = "local") {
  if (Array.isArray(keys)) {
    return new Promise<Partial<StorageDataType>>((resolve) => {
      chrome.storage[area].get(keys, (data) =>
        resolve(restoreNormalizedStorage(data)),
      )
    })
  }
  return new Promise((resolve) => {
    chrome.storage[area].get(keys, (data) =>
      resolve(restoreNormalizedValue(data[keys])),
    )
  })
}

async function setItems(
  keyOrItems: Partial<StorageDataType> | string,
  value?: any,
  area: StorageArea = "local",
) {
  if (typeof keyOrItems === "object") {
    return new Promise<boolean>((resolve) => {
      chrome.storage[area].set(normalizeStorage(keyOrItems), () => {
        resolve(!chrome.runtime.lastError)
      })
    })
  }
  return new Promise<boolean>((resolve) => {
    chrome.storage[area].set(
      { [keyOrItems]: normalizeStorageValue(value) },
      () => {
        resolve(!chrome.runtime.lastError)
      },
    )
  })
}

async function removeItems(
  keys: string | string[],
  area: StorageArea = "local",
) {
  if (Array.isArray(keys)) {
    return new Promise<boolean>((resolve) => {
      chrome.storage[area].remove(keys, () => {
        resolve(!chrome.runtime.lastError)
      })
    })
  }
  return new Promise<boolean>((resolve) => {
    chrome.storage[area].remove(keys, () => {
      resolve(!chrome.runtime.lastError)
    })
  })
}

const createGetter = <S extends StorageDataType>(area: StorageArea) =>
  ((keys) => getItems(keys, area)) as StorageGetter<S>

const createSetter = <S extends StorageDataType>(area: StorageArea) =>
  ((keyOrItems, value = undefined) =>
    setItems(keyOrItems, value, area)) as StorageSetter<S>

const createRemover = <S extends StorageDataType>(area: StorageArea) =>
  ((keys) => removeItems(keys, area)) as StorageRemover<S>

const createStorage = <T extends StorageDataType>(area: StorageArea) => ({
  get: createGetter<T>(area),
  set: createSetter<T>(area),
  remove: createRemover<T>(area),
  clear: () => chrome.storage[area].clear(),
})

const clearAllStorage = () =>
  Promise.all([
    chrome.storage.local.clear(),
    chrome.storage.sync.clear(),
    chrome.storage.session.clear(),
  ]).catch((e) => {
    console.error(e)
  })

export { createStorage, clearAllStorage }
