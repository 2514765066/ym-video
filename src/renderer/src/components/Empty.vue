<template>
  <section class="flex-center flex-col gap-4">
    <Icon name="box" size="120" color="#5A5A5A" />
    <span class="text-main-darken text-lg">暂无更多内容...</span>
  </section>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
</script>

<style scoped lang="scss">
section {
  height: calc(100vh - 44px - 132px - 132px);
}
</style>
