import { storage } from "@/utils/storage"
import { API_URLS } from "./urls"

const ALARM_NAME = "merchants_refetch"

const fetchAll = async () => {
  try {
    const res = await fetch(API_URLS.MERCHANTS, { method: "GET" })
    const data = await res.json()
    return data.data
  } catch (e) {
    return undefined
  }
}

const initPeriodicRefetch = () => {
  chrome.alarms.create(ALARM_NAME, {
    periodInMinutes: 4 * 60,
  })
  storage.local.set("merchants_refetch_alarm_flag", true)
}

const init = async () => {
  const merchants = await storage.local.get("merchants")
  if (!merchants?.length) {
    const fetched = await fetchAll()
    await storage.local.set("merchants", fetched)
    initPeriodicRefetch()
    return
  }
  if (await chrome.alarms.get(ALARM_NAME)) return

  /* sometimes restarting browser resets the alarms:
   (https://developer.chrome.com/docs/extensions/reference/api/alarms#persistence)
   
   */
  if (await storage.local.get("merchants_refetch_alarm_flag")) {
    initPeriodicRefetch()
  }
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    fetchAll().then((merchants) => {
      storage.local.set("merchants", merchants)
    })
  }
})

export const APIMerchants = {
  fetch: fetchAll,
  init,
  initPeriodicRefetch,
}
