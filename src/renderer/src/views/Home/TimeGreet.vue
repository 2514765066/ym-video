<template>
  <header class="flex justify-center items-center w-full pt-6">
    <strong class="text-3xl">{{ greet }}好呀，亲爱的用户😊</strong>
  </header>
</template>

<script setup lang="ts">
import { getTimeOfDay } from "@/utils/time";

const greet = ref(getTimeOfDay());
</script>

<style scoped lang="scss">
header {
  > strong {
    color: #d4d4d4;
  }
}
</style>
