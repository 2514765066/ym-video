<template>
  <Content>
    <TimeGreet class="mb-6"></TimeGreet>

    <Group title="最近观看" icon="history" v-if="data.length != 0">
      <ul class="gap-4 h-fit grid grid-list">
        <HistoryInfo v-for="item of data" :key="item.name" :data="item" />
      </ul>
    </Group>

    <Group title="最近更新内容" icon="book">
      <ul class="group-content rounded-xl px-5 py-3">
        <li
          v-for="item of currentDocData.data"
          class="text-sm text-color-darken tracking-wide flex items-center"
        >
          {{ item }}
        </li>
      </ul>
    </Group>
  </Content>
</template>

<script setup lang="ts">
import Content from "@/components/Content/index.vue";
import TimeGreet from "./TimeGreet.vue";
import HistoryInfo from "@/components/Info/HistoryInfo.vue";
import Group from "@/components/Group.vue";
import { useVideoStore } from "@/stores/useVideoStore";
import { useDocStore } from "@/stores/useDocStore";

const { currentDocData } = storeToRefs(useDocStore());
const { data } = storeToRefs(useVideoStore());
</script>

<style scoped lang="scss">
.group-content {
  background-color: #1f1f1f;

  > li {
    height: 30px;
  }
}
</style>
