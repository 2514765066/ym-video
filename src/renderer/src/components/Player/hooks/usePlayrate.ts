import { videoRef } from "./useEl";

//倍速
export const playrate = ref("1.0");

//监视倍速
watchEffect(() => {
  if (!videoRef.value) {
    return;
  }

  videoRef.value.playbackRate = Number(playrate.value);
});
