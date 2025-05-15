<template>
  <section class="flex flex-col justify-center items-center gap-4">
    <Icon name="loading" size="50" color="#5A5A5A" />
    <span class="text-color-darken">加载中...</span>
  </section>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    height?: string;
  }>(),
  {
    height: "100%",
  }
);
</script>

<style scoped lang="scss">
section {
  height: v-bind("height");
}
</style>
