<template>
  <section class="w-48 h-full flex flex-col flex-shrink-0">
    <header class="px-2 pb-2 flex justify-between items-center gap-2">
      <span class="text-main text-sm">
        选集 共{{ selectedVideo.url.length }} 集
      </span>

      <Update />
    </header>

    <ElScrollbar view-class="px-2 flex flex-col gap-1" ref="scrollbarRef">
      <Item v-for="item of currentList" :key="item.value" :data="item" />
    </ElScrollbar>

    <Page
      v-if="selectedVideo.url.length > 1"
      :pageSize="pageSize"
      :totle="selectedVideo.url.length"
      v-model.number="currentPage"
    />
  </section>
</template>

<script setup lang="ts">
import Item from "./Item.vue";
import Page from "./Page.vue";
import Update from "./Update.vue";
import { ElScrollbar, ScrollbarInstance } from "element-plus";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());

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

  return selectedVideo.value.url.slice(start, start + pageSize);
});

//滚动到对应的集数
onMounted(() => {
  scrollbarRef.value!.scrollTo(
    0,
    ((selectedVideo.value.history % pageSize) - 1) * 36
  );
});
</script>

<style scoped lang="scss"></style>
