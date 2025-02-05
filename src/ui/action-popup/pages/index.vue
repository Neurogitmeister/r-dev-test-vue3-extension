<script setup lang="ts"></script>

<template>
  <div>
    <div class="hero">
      <div class="hero-content text-center">
        <div class="max-w-md">
          <div class="flex gap-2 justify-center mb-4">
            <RouterLink
              to="/common/features"
              class="btn btn-primary"
            >
              <i-ph-list-heart />
              Features
            </RouterLink>
            <RouterLink
              to="/common/pricing"
              class="btn btn-primary"
            >
              <i-ph-presentation-chart />
              Pricing
            </RouterLink>
          </div>

          <RouterLink
            to="/action-popup/stores"
            class="btn btn-secondary btn-lg"
          >
            <i-ph-rocket-launch />
            Show stores now
          </RouterLink>

          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
