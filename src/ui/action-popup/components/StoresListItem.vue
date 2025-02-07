<script setup lang="ts">
const props = defineProps<{ merchant: Merchant }>()
const state = defineModel<MerchantState>("state", { required: true })
const addClick = () => {
  state.value = {
    ...state.value,
    clicksCount: (state.value.clicksCount || 0) + 1,
  }
}
const openMerchantTab = () => {
  const url = `https://www.${props.merchant.domain}/`
  chrome.tabs.create({
    active: true,
    url,
  })
}
</script>

<template>
  <div class="list-item">
    <span
      class="store-link"
      @click="
        () => {
          addClick()
          openMerchantTab()
        }
      "
    >
      {{ merchant.domain }}
    </span>
    <span>{{ state.clicksCount || 0 }}</span>
  </div>
</template>

<style scoped lang="scss">
.store-link {
  cursor: pointer;
  user-select: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
