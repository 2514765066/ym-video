<template>
  <section
    class="w-2 h-40 flex items-end absolute top-1/2 right-3 -translate-y-1/2 rounded-full"
    v-show="visible"
  >
    <div class="w-full rounded-full bg-main"></div>
  </section>
</template>

<script setup lang="ts">
import { volume } from "@player/hooks/useVolume";

const visible = ref(false);

let timer: any;

const controlTimer = () => {
  clearTimeout(timer);

  visible.value = true;

  timer = setTimeout(() => {
    visible.value = false;
  }, 2000);
};

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    //上方向键
    case "ArrowUp":
      controlTimer();

      if (volume.value == 100) {
        return;
      }

      volume.value += 5;

      return;

    //下方向键
    case "ArrowDown":
      controlTimer();

      if (volume.value == 0) {
        return;
      }

      volume.value -= 5;
      return;
  }
};

onMounted(() => {
  window.addEventListener("keydown", handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeyDown);
});
</script>

<style scoped lang="scss">
section {
  backdrop-filter: blur(100px);
  background-color: rgba(#000, 0.2);
  box-shadow: rgba(0, 0, 0, 0.48) 0px 24px 48px -8px,
    rgba(0, 0, 0, 0.24) 0px 4px 12px -1px;

  > div {
    height: calc(v-bind("volume") * 1%);

    transition: height 0.1s;
  }
}
</style>
