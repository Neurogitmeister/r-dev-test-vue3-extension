<script setup lang="ts">
const merchantsStore = useMerchantsStore()
const { merchants } = storeToRefs(merchantsStore)
</script>

<template>
  <div class="list">
    <span>Stores:</span>
    <div
      v-for="merchant of merchants"
      :key="merchant.domain"
      class="list-item"
    >
      {{ merchant.domain }}
    </div>
  </div>
</template>

<style scoped></style>
