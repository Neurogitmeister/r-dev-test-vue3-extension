import { APIMerchants } from "./api/merchants"

chrome.runtime.onInstalled.addListener(async (opt) => {
  if (opt.reason === "install") {
    // show welcome page
  }

  if (opt.reason === "update") {
    // do stuff on version update
  }
})

const onInit = async () => {
  await migrateStorage()
  // await auth.init() // - where JWT auth would start, if there was one
  await APIMerchants.init()
  await storage.session.set("healthStatus", true)
}

onInit()
