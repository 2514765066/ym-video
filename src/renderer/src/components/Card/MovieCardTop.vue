<template>
  <ElSkeleton :loading="loading" animated>
    <template #template>
      <el-skeleton-item
        variant="rect"
        style="width: 100%; height: 300px; border-radius: 1rem"
      />
    </template>

    <section
      class="flex items-center w-full rounded-2xl overflow-hidden cursor-pointer"
      @click="handlePlay"
    >
      <div class="p-7 w-1/2 flex flex-col gap-3 h-full">
        <div class="gap-1.5 flex items-center">
          <Icon name="video" size="16" color="#ffffffcf" />

          <span class="text-main-darken text-xs">推荐</span>
        </div>

        <span
          class="text-3xl font-bold text-main tracking-widest text-wrap line-ellipsis-2"
        >
          {{ data.name }}
        </span>

        <span class="text-sm text-wrap text-main line-ellipsis-3">
          {{ data.sub }}
        </span>

        <div class="mt-auto flex items-center gap-2">
          <span class="text-sm text-main">播放</span>

          <Icon
            name="arrow"
            size="14"
            color="#ffffffcf"
            style="transform: rotate(180deg)"
          />
        </div>
      </div>

      <img :src="data.pic" class="w-1/2 h-full" />
    </section>
  </ElSkeleton>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import { openLoading, closeLoading } from "@/components/Loading";

const { play } = useVideoStore();

defineProps<{
  color: string;
}>();

const data = defineModel<MovieInfo>({ required: true });

//加载完成
const loading = ref(true);

//播放
const handlePlay = async () => {
  openLoading();

  // await play(data.value.name, data.value.pic);
  await play(data.value.name);

  closeLoading();
};

//初始化获取图片
const getPic = async () => {
  data.value.pic = await ipcRenderer.invoke("getImg", data.value.pic);
  loading.value = false;
};

getPic();

onUnmounted(() => {
  closeLoading();
});
</script>

<style scoped lang="scss">
section {
  height: 300px;

  background-color: v-bind("color");

  box-shadow: 0 1px 10px 2px rgba(#000, 0.1);
  transition: transform 0.1s;

  &:hover {
    transform: scale(1.05);
  }
}
</style>
