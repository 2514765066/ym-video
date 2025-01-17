<template>
  <Info :data="data" :loading="loading" :src="src" @play="handlePlay" />
</template>

<script setup lang="ts">
import Info from "./index.vue";
import { MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useVersionStore } from "@/stores/useVersionStore";

const { version } = useVersionStore();
const videoStore = useVideoStore();

const props = defineProps<{
  data: MovieInfo;
}>();

//图片的base64
const src = ref("");

//图片是否加载完成
const loading = ref(true);

//处理点击
const handlePlay = async () => {
  //存在直接播放
  if (videoStore.has(props.data.name)) {
    videoStore.before(props.data.name);
    eventEmitter.emit("video:show");
    return;
  }

  videoStore.add({
    name: props.data.name,
    history: 0,
    url: props.data.url!,
    minVersion: version,
    pic: src.value,
  });

  eventEmitter.emit("video:show");
};

//初始化获取图片
(async () => {
  src.value = await api.getImg(props.data.pic);

  loading.value = false;
})();
</script>

<style scoped lang="scss"></style>
