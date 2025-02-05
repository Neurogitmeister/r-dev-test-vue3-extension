import { clearAllStorage } from "./storage-utils"

const STORAGE_VERSION = "0.0.1"
const STORAGE_VERSION_KEY = "storageVersion"

const getStorageVersion = () =>
  new Promise<string>((resolve) => {
    chrome.storage.local.get(STORAGE_VERSION_KEY, (data) =>
      resolve(data[STORAGE_VERSION_KEY]),
    )
  })

const setStorageVersion = (version: string) =>
  new Promise<boolean>((resolve) => {
    chrome.storage.local.set({ [STORAGE_VERSION_KEY]: version }, () => {
      resolve(!chrome.runtime.lastError)
    })
  })

const migrateStorage = async () => {
  const lastStorageVersion = await getStorageVersion()

  console.info("storage version:", STORAGE_VERSION)
  console.info("last storage version:", lastStorageVersion)

  if (STORAGE_VERSION !== lastStorageVersion) {
    console.info("storage version changed, clear storage")
    await clearAllStorage()
    await setStorageVersion(STORAGE_VERSION)
  }
}

export { migrateStorage }
