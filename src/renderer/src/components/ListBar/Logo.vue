<template>
  <section class="w-full h-11">
    <div class="flex items-center px-2">
      <img src="@/assets/icon.png" width="18px" />

      <span class="ml-2 text-color text-lg">ym-video</span>
    </div>
  </section>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
section {
  -webkit-app-region: drag;

  > div {
    span {
      font-family: logo;
    }
  }
}
</style>
