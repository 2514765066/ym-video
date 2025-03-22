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
      @click="playHandler"
    >
      <div class="p-7 w-1/2 flex flex-col gap-3 h-full">
        <div class="gap-1.5 flex items-center">
          <svg width="16" viewBox="0 0 20 20">
            <path
              d="M2 7a3 3 0 0 1 3-3h5a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3zm14.037 7.776L14 13.369V6.63l2.037-1.406a1.25 1.25 0 0 1 1.96 1.028v7.495a1.25 1.25 0 0 1-1.96 1.029"
            />
          </svg>

          <span class="text-color-darken text-xs">推荐</span>
        </div>

        <span
          class="text-3xl font-bold text-color tracking-widest text-wrap line-ellipsis-2"
        >
          {{ data.name }}
        </span>

        <span class="text-sm text-wrap text-color line-ellipsis-3">
          {{ data.sub }}
        </span>

        <div
          class="mt-auto flex items-center gap-1 opacity-0 transition-opacity"
        >
          <span class="text-sm text-color">播放</span>
          <Icon
            name="arrow1"
            size="14"
            color="rgba(255,255,255,0.443)"
            style="transform: rotate(180deg)"
          />
        </div>
      </div>

      <img :src="data.pic" class="w-1/2 h-4/5 rounded-s-xl" />
    </section>
  </ElSkeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";

const { play } = useVideoStore();

defineProps<{
  color: string;
}>();

const data = defineModel<MovieInfo>({ required: true });

//加载完成
const loading = ref(true);

//播放
const playHandler = () => {
  play(data.value.name, data.value.pic);
};

//初始化获取图片
const getPic = async () => {
  data.value.pic = await ipcRenderer.invoke("getImg", data.value.pic);
  loading.value = false;
};

getPic();
</script>

<style scoped lang="scss">
section {
  height: 300px;

  border: 1px solid rgba(255, 255, 255, 0.03);
  background-color: v-bind("color");

  svg {
    fill: v-bind("color");
    filter: brightness(3);
  }

  &:hover {
    > div {
      > div {
        opacity: 1;
      }
    }
  }
}
</style>
