import { playrate } from "./usePlayrate";
import { back, forward, reset } from "./useTime";
import Hls from "hls.js";
import { play } from "./usePlay";
import { videoRef } from "./useEl";
import { useVideoStore } from "@/stores/useVideoStore";

export const useInit = () => {
  const { selectEpisode } = storeToRefs(useVideoStore());

  //hls实例
  const hls = new Hls({
    startFragPrefetch: true,
    maxBufferLength: 5 * 60,
    maxBufferSize: 1024 * 1024 * 200,
  });

  //加载完成播放
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    hls.currentLevel = hls.levels.length - 1;

    play();
  });

  let holdTimeout: any;

  //是否按下右方向键
  const isHolding = ref(false);

  //键盘抬起事件
  const handleKeyUp = (e: KeyboardEvent) => {
    switch (e.key) {
      //右方向键
      case "ArrowRight":
        clearTimeout(holdTimeout);

        if (isHolding.value) {
          isHolding.value = false;
          playrate.value = "1.0";
          return;
        }

        forward();
        return;
    }
  };

  //键盘按下事件
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      //右方向键
      case "ArrowRight":
        if (isHolding.value) {
          return;
        }

        holdTimeout = setTimeout(() => {
          isHolding.value = true;
          playrate.value = "3.0";
        }, 300);
        return;

      //左方向键
      case "ArrowLeft":
        back();
        return;
    }
  };

  //切换播放链接
  watchEffect(() => {
    hls.loadSource(selectEpisode.value.url);

    reset();
  });

  onMounted(() => {
    hls.attachMedia(videoRef.value!);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
  });

  onUnmounted(() => {
    hls.destroy();
    window.removeEventListener("keydown", handleKeyDown);
    window.removeEventListener("keyup", handleKeyUp);
  });
};
