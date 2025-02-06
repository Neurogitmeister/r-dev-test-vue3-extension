import { MerchantState } from "@/utils/storage"

export const useMerchantsStore = defineStore("merchants", () => {
  const { data: merchants } = useBrowserLocalStorage("merchants")

  const { data: merchantStatesMap } = useBrowserLocalStorage(
    "merchantStatesMap",
    new Map(),
  )

  const { data: merchantsStorageState } = useBrowserLocalStorage(
    "merchantsStorageState",
  )

  const setMerchantState = (domain: string, state: MerchantState) => {
    merchantStatesMap.value.set(domain, state)
  }

  const updateMerchantState = (domain: string, state: MerchantState) => {
    const oldState = merchantStatesMap.value.get(domain)
    merchantStatesMap.value.set(domain, { ...oldState, ...state })
  }

  const getMerchantByUrl = (url: string) => {
    return merchants.value?.find((m) => url.includes("." + m.domain))
  }

  const isMerchantSerpDisabled = (merchant: Merchant) => {
    return false
  }

  return {
    merchants,
    setMerchantState,
    updateMerchantState,
    getMerchantByUrl,
    isMerchantSerpDisabled,
  }
})
