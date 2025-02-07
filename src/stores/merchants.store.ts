import { MerchantState } from "@/utils/storage"

export const useMerchantsStore = defineStore("merchants", () => {
  const { data: merchants } = useBrowserLocalStorage("merchants", [])

  const { data: merchantStatesMap } = useBrowserLocalStorage(
    "merchantStatesMap",
    {},
  )

  const { data: merchantsStorageState } = useBrowserLocalStorage(
    "merchantsStorageState",
    "loading",
  )

  const getMerchantState = (merchant: Merchant) =>
    merchantStatesMap.value[merchant.domain] || {}

  const setMerchantState = (merchant: Merchant, state: MerchantState) => {
    merchantStatesMap.value[merchant?.domain] = state
  }

  const updateMerchantState = (merchant: Merchant, state: MerchantState) => {
    const oldState = merchantStatesMap.value[merchant.domain] || {}
    merchantStatesMap.value[merchant.domain] = { ...oldState, ...state }
  }

  const getMerchantByUrl = (url: string) =>
    merchants.value?.find(
      (merchant) =>
        url.includes("." + merchant.domain) ||
        url.includes("//" + merchant.domain),
    )

  const isMerchantSerpDisabled = (merchant: Merchant) => {
    return false
  }

  return {
    merchants,
    merchantsStorageState,
    getMerchantState,
    setMerchantState,
    updateMerchantState,
    getMerchantByUrl,
    isMerchantSerpDisabled,
  }
})
