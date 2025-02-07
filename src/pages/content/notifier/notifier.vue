<script setup lang="ts">
const img = chrome.runtime.getURL("src/assets/logo.png")

const url = inject<ComputedRef<string>>("url")
const merchantsStore = useMerchantsStore()
const { getMerchantByUrl, getMerchantState, updateMerchantState } =
  merchantsStore
const { merchantsStorageState } = storeToRefs(merchantsStore)
const merchant = computed(() =>
  url?.value ? getMerchantByUrl(url.value) : undefined,
)
const state = computed(() =>
  merchant.value ? getMerchantState(merchant.value) : null,
)
const notified = ref(false)

const hideNotification = () => {
  updateMerchantState(merchant.value!, {
    notificationsCount: 0,
    hideNotification: true,
  })
}

watchEffect(() => {
  if (!merchant.value || merchantsStorageState.value !== "ready") return
  if (state.value !== undefined && state.value?.hideNotification) return
  if (notified.value) return

  const count = state.value?.notificationsCount || 0
  if (count >= 3) {
    hideNotification()
  } else {
    updateMerchantState(merchant.value, { notificationsCount: count + 1 })
    notified.value = true
  }
})
</script>

<template>
  <div
    v-if="!!merchant && !state?.hideNotification"
    class="notifier"
  >
    <img :src="img" />
    {{ `Hello from notifier, ${merchant.domain}!` }}

    <button
      class="btn-close"
      @click="hideNotification"
    >
      <i-ph-plus class="icon-cross" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.notifier {
  position: fixed;
  z-index: 2147483647 !important;
  top: 60px;
  right: 60px;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.2),
    0 -1px 0px rgba(0, 0, 0, 0.02);
  background: white;
  color: black;
  padding: 20px;
  padding-right: 40px;
  display: flex;
  align-items: center;

  img {
    height: 16px;
    width: 16px;
    margin-right: 8px;
  }

  .icon-cross {
    transform: rotate(45deg);
    height: 20px;
    width: 20px;
    color: white;
  }

  .btn-close {
    position: absolute;
    right: 8px;
    top: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px;
    border-radius: 4px;
    background-color: #b93b3b;
    cursor: pointer;
    border: none;
    outline: none;

    &:hover {
      opacity: 0.85;
    }
  }
}
</style>
