import { storage } from "@/utils/storage"
import { retry } from "./utils"
import { API_URLS } from "./urls"

const ALARM_NAME = "merchants_refetch"

const fetchAll = async () => {
  await storage.local.set("merchantsStorageState", "loading")
  try {
    const res = await retry(
      () => fetch(API_URLS.MERCHANTS, { method: "GET" }),
      {
        onRetry: () => {
          storage.local.set("merchantsStorageState", "retrying")
        },
      },
    )
    const data = await res.json()

    initPeriodicRefetch()
    return data.data as Merchant[]
  } catch (e) {
    initPeriodicRefetch()
    await storage.local.set("merchantsStorageState", "ready")
    return undefined
  }
}

const setAll = async (merchants: Merchant[]) => {
  await storage.local.set({ merchantsStorageState: "writing", merchants })
  const states = await storage.local.get("merchantStatesMap")

  if (!states?.size) {
    await storage.local.set("merchantsStorageState", "ready")
    return
  }

  const remappedStates: MerchantStatesMap = {}
  merchants.forEach((m) => {
    const state = states[m.domain]
    if (state) remappedStates[m.domain] = state
  })
  await storage.local.set({
    merchantsStorageState: "ready",
    merchantStatesMap: remappedStates,
  })
}

const initPeriodicRefetch = async () => {
  chrome.alarms.create(ALARM_NAME, {
    periodInMinutes: 4 * 60,
  })
  await storage.local.set("merchantsRefetchAlarmFlag", true)
}

const init = async () => {
  const merchants = await storage.local.get("merchants")

  if (!merchants?.length) {
    const fetched = await fetchAll()
    if (!fetched) return // keep currently saved merchants

    setAll(fetched)
    return
  }

  if (await chrome.alarms.get(ALARM_NAME)) return

  /* sometimes restarting browser resets the alarms:
   (https://developer.chrome.com/docs/extensions/reference/api/alarms#persistence)
   */
  if (await storage.local.get("merchantsRefetchAlarmFlag")) {
    initPeriodicRefetch()
  }

  // clear states at session end
  if (!(await storage.session.get("healthStatus"))) {
    console.info("session ended, restore notification...")
    const states = await storage.local.get("merchantStatesMap")
    if (!states) return
    Object.values(states).forEach((state) => {
      state.hideNotification = false
    })
    await storage.local.set({ merchantStatesMap: states })
  }
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    fetchAll().then((merchants) => merchants && setAll(merchants))
  }
})

export const APIMerchants = {
  init,
  fetch: fetchAll,
  set: setAll,
  initPeriodicRefetch,
}
