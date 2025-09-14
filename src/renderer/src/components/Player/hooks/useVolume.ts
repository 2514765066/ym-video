import { videoRef } from "./useEl";

//声音
export const volume = ref(100);

watchEffect(() => {
  if (!videoRef.value) {
    return;
  }

  videoRef.value.volume = volume.value / 100;
});
