import { APIMerchants } from "./api/merchants"

chrome.runtime.onInstalled.addListener(async (opt) => {
  if (opt.reason === "install") {
    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL("src/ui/setup/index.html#/setup/install"),
    })
  }

  if (opt.reason === "update") {
    chrome.tabs.create({
      active: true,
      url: chrome.runtime.getURL("src/ui/setup/index.html#/setup/update"),
    })
  }
})

const onInit = async () => {
  await migrateStorage()
  // await auth.init() // - where JWT auth would start, if there was one
  await APIMerchants.init()
  await storage.session.set("healthStatus", true)
}

onInit()

self.onerror = function (message, source, lineno, colno, error) {
  console.info("Error: " + message)
  console.info("Source: " + source)
  console.info("Line: " + lineno)
  console.info("Column: " + colno)
  console.info("Error object: " + error)
}

export {}
