<template>
  <aside class="mask p-f" v-if="model" @click.self="model = false">
    <slot></slot>
  </aside>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<style scoped lang="scss">
.mask {
  width: 100vw;
  height: calc(100vh - 38px);
  top: 38px;
  left: 0;
  z-index: 999;
}
</style>
