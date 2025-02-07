<script setup lang="ts">
defineProps<{
  merchant: Merchant
  state?: MerchantState
}>()
</script>

<template>
  <div class="merchant-info">
    <p>{{ merchant.domain }}</p>
    <p>{{ merchant.text }}</p>
    <p class="state-header">State:</p>
    <table>
      <tbody>
        <tr>
          <td>Clicked:</td>
          <td>{{ state?.clicksCount || 0 }} times</td>
        </tr>
        <tr>
          <td>Notified:</td>
          <td>{{ state?.notificationsCount || 0 }} times</td>
        </tr>
        <tr>
          <td>Disabled notification:</td>
          <td>{{ state?.hideNotification ? "true" : "false" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
.merchant-info {
  text-align: start;
  display: flex;
  flex-direction: column;
}
.state-header {
  margin-top: 16px;
  margin-bottom: 4px;
}
</style>
