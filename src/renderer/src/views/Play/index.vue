<template>
  <section class="w-full h-full" v-if="selectedVideo?.url">
    <Default v-if="selectedVideo.pic" />
    <XM v-else />
  </section>

  <Tip msg="哎呀，无播放链接。请删除、重新导入或点击更新集数。" v-else />
</template>

<script setup lang="ts">
import Tip from "@/components/Tip/index.vue";
import XM from "./XM/index.vue";
import Default from "./Default/index.vue";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());
const router = useRouter();

watch(selectedVideo, val => {
  if (!val) {
    router.push("/home");
  }
});
</script>

<style scoped lang="scss"></style>
