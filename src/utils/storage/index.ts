import type { BasicColorSchema } from "@vueuse/core"
import { createStorage } from "./storage-utils"

interface Merchant {
  domain: string
  text: string
}

interface MerchantState {
  showNotification?: boolean
}

interface ILocalStorage {
  merchants?: Merchant[]
  merchants_refetch_alarm_flag?: boolean
  userLocale?: string
  darkMode?: BasicColorSchema
}

interface ISessionStorage {
  merchantStates?: Map<Merchant["domain"], MerchantState>
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
export type { Merchant, MerchantState }
export { storage }
