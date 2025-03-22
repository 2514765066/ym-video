<template>
  <section class="tip w-full h-full relative flex justify-center items-center">
    <header class="w-full h-11 absolute top-0 left-0"></header>

    <section class="text-color text-xl text-center flex flex-col items-center">
      {{ msg }}

      <aside class="mt-8"></aside>
    </section>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<style scoped lang="scss">
.tip {
  background-color: #191919;

  > header {
    -webkit-app-region: drag;
  }

  > section {
    width: 350px;

    > aside {
      width: 280px;
      height: 1px;
      background-color: #373737;
    }
  }
}
</style>
