<script setup lang="ts">
import StoresListItem from "./StoresListItem.vue"
const merchantsStore = useMerchantsStore()
const { merchants } = storeToRefs(merchantsStore)
const { getMerchantState, updateMerchantState } = merchantsStore
</script>

<template>
  <div class="list">
    <span>Stores:</span>
    <StoresListItem
      v-for="merchant of merchants"
      :key="merchant.domain"
      :merchant="merchant"
      :state="getMerchantState(merchant)"
      @update:state="
        (state: MerchantState) => updateMerchantState(merchant, state)
      "
    />
  </div>
</template>

<style scoped lang="scss">
.list-item {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
</style>
