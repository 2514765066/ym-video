import { videoRef } from "./useEl";

//缓冲区大小
export const videoBufferedTime = ref(0);

//前进
export const forward = () => {
  if (!videoRef.value) {
    return;
  }

  go(videoRef.value.currentTime + 5);
};

//后退
export const back = () => {
  if (!videoRef.value) {
    return;
  }

  go(videoRef.value.currentTime - 5);
};

//到达某一时间
export const go = (seconde: number) => {
  if (!videoRef.value) {
    return;
  }

  videoRef.value.currentTime = seconde;
};

//重置
export const reset = () => {
  videoBufferedTime.value = 0;
};
