<template>
  <section class="p-2 w-full rounded-md flex flex-col gap-2">
    <header class="flex items-center gap-2">
      <Icon name="update" size="20" color="#D5D5D5" />
      <strong class="text-sm text-color">发现新版本</strong>
    </header>

    <main class="flex flex-col gap-1">
      <span class="text-sm text-color">最新版本：v{{ version }}</span>
      <span class="text-sm text-color">下载进度：0/100%</span>
    </main>
  </section>
</template>

<script setup lang="ts">
const version = ref("4.0.1");
</script>

<style scoped lang="scss">
section {
  border: 1px solid rgba(255, 255, 255, 0.055);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 12px -2px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px;

  > main {
    padding-left: 22px;
  }
}
</style>
