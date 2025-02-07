<script setup lang="ts">
import CurrentStoreInfo from "./components/CurrentStoreInfo.vue"
import StoresList from "./components/StoresList.vue"

const merchantsStore = useMerchantsStore()
const { getMerchantByUrl, getMerchantState } = merchantsStore
const { merchantsStorageState } = storeToRefs(merchantsStore)

const merchant = computed(() =>
  url?.value ? getMerchantByUrl(url.value) : undefined,
)
const state = computed(() =>
  merchant.value ? getMerchantState(merchant.value) : undefined,
)

const url = ref<string>()

onMounted(() => {
  getCurrentTabUrl().then((currUrl) => {
    url.value = currUrl
  })
})
</script>

<template>
  <template v-if="merchantsStorageState === 'loading'">
    <LoadingSpinner :loading="merchantsStorageState === 'loading'" />
  </template>
  <template v-else-if="merchantsStorageState === 'ready'">
    <template v-if="merchant">
      <!-- store popup -->
      <CurrentStoreInfo
        :merchant="merchant"
        :state="state"
      />
    </template>
    <template v-else>
      <!-- default popup -->
      <RouterLink
        to="/action-popup/all-pages"
        class="btn btn-primary"
      >
        Pages
      </RouterLink>
      <StoresList />
    </template>
  </template>
  <template v-else-if="merchantsStorageState === 'error'">
    <span>Error loading store info :(</span>
  </template>
</template>

<style scoped></style>
