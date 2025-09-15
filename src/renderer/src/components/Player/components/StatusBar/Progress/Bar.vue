<template>
  <ProgressTip
    :content="content"
    :offset="offset"
    v-model="progressTipVisible"
  />

  <section
    class="ym-player-progress-bar w-full h-2 flex items-center relative cursor-pointer"
    @mousemove="handleMouseMove"
    @mouseenter="progressTipVisible = true"
    @mouseleave="progressTipVisible = false"
    @click="go(seconde)"
  >
    <div
      class="progress-track w-full h-full absolute backdrop-blur-lg rounded-full"
      ref="progressRef"
    />

    <div class="progress-buffer h-full absolute rounded-full" />

    <div class="progress-play h-full absolute rounded-full bg-main" />

    <div class="progress-thumb w-1 h-2.5 absolute rounded-sm bg-main" />
  </section>
</template>

<script setup lang="ts">
import ProgressTip from "@player/lib/ProgressTip.vue";
import { formatTime } from "@/utils/time";
import { videoBufferedTime, go } from "@player/hooks/useTime";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectEpisode } = storeToRefs(useVideoStore());

//进度条元素实例
const progressRef = ref<HTMLDivElement>();

//进度条提示显示
const progressTipVisible = ref(false);

//当前鼠标悬浮的秒数
const seconde = ref(0);

//显示内容
const content = computed(() => {
  return formatTime(seconde.value);
});

//偏移量
const offset = ref([0, 0]);

//播放进度
const progressWidth = computed(
  () => (selectEpisode.value.currentTime / selectEpisode.value.duration) * 100
);

//缓冲进度
const bufferedWidth = computed(
  () => (videoBufferedTime.value / selectEpisode.value.duration) * 100
);

//处理鼠标移动
const handleMouseMove = (e: MouseEvent) => {
  if (!progressRef.value) {
    return;
  }

  const rect = progressRef.value.getBoundingClientRect();
  offset.value = [e.clientX, rect.top + 5];

  seconde.value =
    ((e.clientX - rect.left) / progressRef.value.clientWidth) *
    selectEpisode.value.duration;
};
</script>

<style scoped lang="scss">
.ym-player-progress-bar {
  height: 5px;

  .progress-track {
    background-color: rgba(#fff, 0.3);
  }

  .progress-buffer {
    width: calc(v-bind("bufferedWidth") * 1%);
    background-color: rgba(#fff, 0.4);
  }

  .progress-play {
    width: calc(v-bind("progressWidth") * 1%);
  }

  .progress-thumb {
    left: calc(v-bind("progressWidth") * 1%);
  }
}
</style>
