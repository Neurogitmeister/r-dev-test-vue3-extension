<script setup lang="ts">
defineProps<{
  merchant: Merchant
}>()
</script>

<template>
  <div class="merchant-info">
    <div>{{ merchant.domain }}</div>
    <div>{{ merchant.text }}</div>
  </div>
</template>

<style scoped lang="scss">
.merchant-info {
  text-align: start;
}
</style>
