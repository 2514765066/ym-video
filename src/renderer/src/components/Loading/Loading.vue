<template>
  <section
    class="fixed top-0 left-0 w-screen h-screen flex-center flex-col gap-4"
  >
    <Icon name="loading" size="50" color="#ffffffcf" />
    <span class="text-main">{{ title }}</span>
  </section>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";

withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: "加载中...",
  }
);
</script>

<style scoped lang="scss">
section {
  z-index: 999;
  background-color: rgba(#000, 0.2);
  backdrop-filter: blur(100px);
}
</style>
