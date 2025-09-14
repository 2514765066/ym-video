<template>
  <Content>
    <TimeGreet class="mb-6" />

    <Group title="最近观看" icon="history">
      <ul class="gap-4 h-fit grid grid-list">
        <HistoryCard v-for="item of data" :key="item.name" :data="item" />

        <Add v-if="data.length == 0" />
      </ul>
    </Group>

    <Group title="最近更新内容" icon="book">
      <ul class="group-content rounded-xl px-5 py-3">
        <li
          v-for="item of docData"
          class="text-sm text-color-darken tracking-wide flex items-center"
        >
          {{ item }}
        </li>
      </ul>
    </Group>
  </Content>
</template>

<script setup lang="ts">
import Add from "@/components/Card/Add.vue";
import Content from "@/components/Content.vue";
import TimeGreet from "./TimeGreet.vue";
import HistoryCard from "@/components/Card/HistoryCard.vue";
import Group from "@/components/Group.vue";
import { useVideoStore } from "@/stores/useVideoStore";
import { useDocStore } from "@/stores/useDocStore";

const { docData } = storeToRefs(useDocStore());
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
