<template>
  <button class="ym-button" @click.stop="emit('click')">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["click"]);
</script>

<style scoped lang="scss">
.ym-button {
  height: 32px;
  padding: 8px 16px;
  border-radius: 5px;
  background-color: #3e3e3e;
  border: 1.5px solid #404040;
  border-top-color: #454545;
  color: #fff;
  transition: 0.15s;

  &:hover {
    background-color: #494949;
  }
}
</style>
