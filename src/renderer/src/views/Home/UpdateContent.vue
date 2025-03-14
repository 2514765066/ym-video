<template>
  <GroupTitle title="最近更新内容" icon="book" />

  <ul class="rounded-xl px-5 py-3">
    <li
      v-for="item of currentDocData.data"
      class="text-sm text-color-darken tracking-wide flex items-center"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import GroupTitle from "@/components/GroupTitle.vue";
import { useDocStore } from "@/stores/useDocStore";

const { currentDocData } = storeToRefs(useDocStore());
</script>

<style scoped lang="scss">
ul {
  background-color: #1f1f1f;

  > li {
    height: 30px;
  }
}
</style>
