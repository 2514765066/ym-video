<template>
  <main
    class="content wh-full flex-center relative overflow-hidden bg-black"
    ref="playerRef"
    @mousemove="showControl()"
  >
    <Tip />

    <Video />

    <Bottom />
  </main>
</template>

<script setup lang="ts">
import Tip from "@player/components/tip/index.vue";
import Video from "@player/components/video.vue";
import Bottom from "@player/components/bottom/index.vue";
//@ts-ignore
import { playerRef } from "@player/stores/useEl";
import { useInit } from "@player/hooks/useInit";
import { setVolume } from "@player/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { setSeek } from "@/browser-windows/player/stores/useProgressStore";
import { setPlay } from "@player/stores/useVideoStore";
import { openRate, resetRate } from "@player/stores/useVideoStore";
import { useHistoryStore } from "@player/stores/useHistoryStore";
import { showControl } from "@player/stores/useControlStore";
import { useEventListener } from "@vueuse/core";

const { saveHistory } = useHistoryStore();

useInit();

let holdTimeout: any;

let isHolding = false;

//处理键盘按下
const handleKeydown = ({ key }: KeyboardEvent) => {
  switch (key) {
    //上方向键
    case "ArrowUp":
      setVolume(volume => volume + 5);

      eventEmitter.emit("player:volume:show");
      return;

    //下方向键
    case "ArrowDown":
      setVolume(volume => volume - 5);

      eventEmitter.emit("player:volume:show");
      return;

    //右方向键
    case "ArrowRight":
      if (isHolding) {
        return;
      }

      holdTimeout = setTimeout(() => {
        isHolding = true;
        openRate();
      }, 300);
      return;

    //空格
    case " ":
      setPlay();
      return;
  }
};

//键盘抬起事件
const handleKeyup = ({ key }: KeyboardEvent) => {
  switch (key) {
    //左方向键
    case "ArrowLeft":
      setSeek(time => time - 5);

      setPlay(true);
      return;

    //右方向键
    case "ArrowRight":
      clearTimeout(holdTimeout);

      if (isHolding) {
        isHolding = false;

        resetRate();

        return;
      }

      setSeek(time => time + 5);

      setPlay(true);
      return;
  }
};

useEventListener("keydown", handleKeydown);
useEventListener("keyup", handleKeyup);
useEventListener("beforeunload", saveHistory);
</script>

<style scoped lang="scss">
.content {
  grid-area: "content";
}
</style>
