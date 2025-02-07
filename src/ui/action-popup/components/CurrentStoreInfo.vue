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
    <table>
      <tbody>
        <tr>
          <th>Clicked:</th>
          <td>{{ state?.clicksCount || 0 }} times</td>
        </tr>
        <tr>
          <th>Notified:</th>
          <td>{{ state?.notificationsCount || 0 }} times</td>
        </tr>
        <tr>
          <th>Disabled notification:</th>
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
</style>
