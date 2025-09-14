import { playerRef } from "./useEl";
import { controlVisible } from "./useBottom";

//是否全屏
export const isFullscreen = ref(false);

//全屏
export const full = async () => {
  if (!playerRef.value) {
    return;
  }

  await playerRef.value.requestFullscreen();
};

//退出全屏
export const exit = async () => {
  if (!document.fullscreenElement) {
    return;
  }

  await document.exitFullscreen();
};

//切换
export const toggle = () => {
  isFullscreen.value ? exit() : full();
};

//监视全屏状态
document.addEventListener("fullscreenchange", () => {
  isFullscreen.value = !!document.fullscreenElement;

  if (!isFullscreen.value) {
    controlVisible.value = true;
  }
});
