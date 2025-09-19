<template>
  <Skeleton :loading="loading">
    <li
      class="w-full h-16 flex items-center gap-3 p-2 rounded-md cursor-pointer"
      @click="handlePlay"
    >
      <img :src="src" class="aspect-square h-full rounded" />

      <div class="flex flex-col w-full overflow-hidden">
        <span class="text-main">{{ data.name }}</span>

        <span
          class="text-main-darken text-sm text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {{ data.sub }}
        </span>
      </div>
    </li>
  </Skeleton>
</template>

<script setup lang="ts">
import Skeleton from "./Skeleton.vue";
import { useVideoStore } from "@/stores/useVideoStore";
import { SearchInfo } from "@type";

const { add } = useVideoStore();

const emits = defineEmits(["click"]);

const props = withDefaults(
  defineProps<{
    data: SearchInfo;
    loading?: boolean;
  }>(),
  {
    loading: false,
  }
);

const src = ref("");

//图片是否加载完成
const loading = ref(true);

//初始化获取图片
const getPic = async () => {
  src.value = await ipcRenderer.invoke("getImg", props.data.pic);

  loading.value = false;
};

//播放
const handlePlay = async () => {
  emits("click");

  add(props.data);
};

getPic();
</script>

<style scoped lang="scss"></style>
