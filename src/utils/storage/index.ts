import type { BasicColorSchema } from "@vueuse/core"
import { createStorage } from "./storage-utils"

interface Merchant {
  domain: string
  text: string
}

interface MerchantState {
  showNotification?: boolean
  clicksCount?: number
}

type MerchantStatesMap = Map<Merchant["domain"], MerchantState>

interface ILocalStorage {
  merchants?: Merchant[]
  merchantStatesMap?: MerchantStatesMap
  merchantsStorageState?: "loading" | "writing" | "retrying" | "error" | "ready"
  merchantsRefetchAlarmFlag?: boolean
  userLocale?: string
  darkMode?: BasicColorSchema
}

interface ISessionStorage {
  healthStatus?: boolean
}

interface ISyncStorage {
  [k: string]: unknown
}

const storage = {
  local: createStorage<ILocalStorage>("local"),
  session: createStorage<ISessionStorage>("session"),
  sync: createStorage<ISyncStorage>("sync"),
}

export type { ILocalStorage, ISessionStorage, ISyncStorage }
export type { Merchant, MerchantState, MerchantStatesMap }
export { storage }
