<template>
  <section class="row v-n-c f-s-0">
    <slot name="icon">
      <img src="@/assets/svg/restore.svg" width="20" />
    </slot>

    <div class="ml-1r mr h-n-c g-1">
      <span class="c-fff fs-14 l-h-14">{{ label }}</span>
      <span class="c-ccc fs-12 l-h-12">{{ des }}</span>
    </div>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  label?: string;
  des?: string;
}>();
</script>

<style scoped lang="scss">
.row {
  height: 65px;
  padding: 0 1rem;
  background-color: #323232;
  border: 1.5px solid #232323;
  border-radius: 5px;
  transition: 0.1s;
}
</style>
