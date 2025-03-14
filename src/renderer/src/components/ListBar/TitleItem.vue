<template>
  <section
    class="cursor-pointer flex items-center px-2 gap-2 rounded-md w-full"
  >
    <span class="text-xs mr-auto">{{ title }}</span>

    <slot></slot>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped lang="scss">
section {
  height: 30px;

  transition: 0.1s;

  > span {
    color: #9b9b9b;
  }

  &:hover {
    background-color: #2c2c2c;
  }
}
</style>
