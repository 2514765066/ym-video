<template>
  <section class="w-36 h-full flex flex-col flex-shrink-0">
    <header class="px-2 pb-2 flex justify-between items-center gap-2">
      <span class="text-color text-sm">
        共{{ selectedVideo.url.length }} 集
      </span>

      <Update />
    </header>

    <ElScrollbar
      view-class="list-content px-2 flex flex-col gap-1"
      ref="scrollbarRef"
    >
      <button
        class="w-full h-8 rounded-md"
        v-for="{ label, value } of currentList"
        :class="{ active: value == selectedVideo.history }"
        @click="handleClick(value)"
      >
        {{ label }}
      </button>
    </ElScrollbar>

    <Page
      :pageSize="pageSize"
      :totle="selectedVideo.url.length"
      v-model.number="currentPage"
    />
  </section>
</template>

<script setup lang="ts">
import Page from "./Page.vue";
import Update from "./Update.vue";
import { ElScrollbar, ScrollbarInstance } from "element-plus";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo, historyList } = storeToRefs(useVideoStore());

//滚动条实例
const scrollbarRef = ref<ScrollbarInstance>();

//每页的数量
const pageSize = 25;

//当前页数
const currentPage = ref(
  Math.ceil((selectedVideo.value.history + 1) / pageSize)
);

//当前页的选集
const currentList = computed(() => {
  const start = (currentPage.value - 1) * pageSize;

  return historyList.value.slice(start, start + pageSize);
});

//点击切换集数
const handleClick = (index: number) => {
  selectedVideo.value.history = index;
};

//滚动到对应的集数
onMounted(() => {
  scrollbarRef.value!.scrollTo(
    0,
    ((selectedVideo.value.history % pageSize) - 1) * 36
  );
});
</script>

<style scoped lang="scss">
.list-content {
  > button {
    background-color: rgba(#fff, 0.06);

    transition: 0.1s;

    &:hover {
      color: #222;
      background-color: var(--main-color);
    }
  }

  .active {
    color: #222;
    background-color: var(--main-color);

    transform: scale(1.05);
  }
}
</style>
