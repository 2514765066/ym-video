<template>
  <aside class="Mask p-f wh-100v" v-if="model" @click.self="model = false">
    <slot></slot>
  </aside>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<style scoped lang="scss">
.Mask {
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
