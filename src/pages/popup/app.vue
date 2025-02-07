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
  <div class="popup">
    <template v-if="merchantsStorageState === 'loading'">
      <LoadingSpinner :loading="merchantsStorageState === 'loading'" />
    </template>
    <template v-else-if="merchantsStorageState === 'ready'">
      <template v-if="merchant">
        <!-- store popup -->
        <div class="popup__container">
          <CurrentStoreInfo
            :merchant="merchant"
            :state="state"
          />
        </div>
      </template>
      <template v-else>
        <!-- default popup -->
        <div class="popup__container">
          <StoresList />
        </div>
      </template>
    </template>
    <template v-else-if="merchantsStorageState === 'error'">
      <span>Error loading store info :(</span>
    </template>
  </div>
</template>

<style scoped lang="scss">
.popup {
  &__container {
    padding: 20px 40px;
  }
}
</style>
