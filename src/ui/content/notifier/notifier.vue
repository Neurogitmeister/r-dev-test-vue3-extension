<script setup lang="ts">
const img = chrome.runtime.getURL("src/assets/logo.png")

const url = inject<ComputedRef<string>>("url")
const { getMerchantByUrl } = useMerchantsStore()
const merchant = computed(() => (url ? getMerchantByUrl(url.value) : undefined))
</script>

<template>
  <div
    v-if="!!merchant"
    class="notifier"
  >
    <img :src="img" />
    {{ `Hello from notifier, ${merchant.domain}!` }}
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
  display: flex;
  align-items: center;
  img {
    height: 16px;
    width: 16px;
    margin-right: 8px;
  }
}
</style>
