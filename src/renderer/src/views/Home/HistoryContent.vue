<template>
  <GroupTitle title="最近观看" icon="history" v-if="data.length != 0" />

  <ul class="gap-4 h-fit grid grid-list mb-8" v-if="data.length != 0">
    <HistoryInfo v-for="item of data" :key="item.name" :data="item" />
  </ul>
</template>

<script setup lang="ts">
import GroupTitle from "@/components/GroupTitle.vue";
import { useVideoStore } from "@/stores/useVideoStore";
import HistoryInfo from "@/components/Info/HistoryInfo.vue";

const { data } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss"></style>
