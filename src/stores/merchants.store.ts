import { MerchantState } from "@/utils/storage"

export const useMerchantsStore = defineStore("merchants", () => {
  const { data: merchants } = useBrowserLocalStorage("merchants", [])

  const { data: merchantStates } = useBrowserSessionStorage(
    "merchantStates",
    new Map(),
  )

  const setMerchantState = (domain: string, state: MerchantState) => {
    merchantStates.value.set(domain, state)
  }

  const updateMerchantState = (domain: string, state: MerchantState) => {
    const oldState = merchantStates.value.get(domain)
    merchantStates.value.set(domain, { ...oldState, ...state })
  }

  return {
    merchants,
    setMerchantState,
    updateMerchantState,
  }
})
