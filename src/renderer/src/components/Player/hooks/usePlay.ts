import { videoRef } from "./useEl";

//只读
export const isPlay = ref(false);

//播放
export const play = async () => {
  if (!videoRef.value) {
    return;
  }

  await videoRef.value.play();
  isPlay.value = true;
};

//暂停
export const pause = () => {
  if (!videoRef.value) {
    return;
  }

  videoRef.value.pause();

  isPlay.value = false;
};

//切换
export const toggle = () => {
  isPlay.value ? pause() : play();
};
