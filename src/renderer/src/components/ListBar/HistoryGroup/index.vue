<template>
  <section class="list-group flex flex-col gap-1 w-full">
    <header class="px-2">
      <span class="text-xs">最近</span>
    </header>

    <Add v-if="data.length == 0" />

    <Item v-for="item of data.slice(0, 10)" :data="item" />
  </section>
</template>

<script setup lang="ts">
import Item from "./Item.vue";
import Add from "./Add.vue";
import { useVideoStore } from "@/stores/useVideoStore";

const { data } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss">
.list-group {
  > header {
    height: 30px;

    > span {
      color: #9b9b9b;
    }
  }
}
</style>
