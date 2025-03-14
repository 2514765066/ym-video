<template>
  <section
    class="disconnect w-full h-full relative flex justify-center items-center"
  >
    <header class="w-full h-11 absolute top-0 left-0"></header>

    <section class="text-color text-xl text-center flex flex-col items-center">
      哎呀，你好像离线了。请连接网络使用此软件。

      <aside class="mt-8"></aside>
    </section>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.disconnect {
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
