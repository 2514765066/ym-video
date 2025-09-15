<template>
  <section
    class="w-full flex flex-col rounded-md px-3 py-1 cursor-pointer"
    :class="{ active: data.value == selectedVideo.history }"
    @click="handleClick()"
  >
    <span class="text-base">第{{ data.value + 1 }}集</span>

    <span class="text-sm text-main-darken"> 已观看{{ precent }}%</span>
  </section>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());

const props = defineProps<{
  data: {
    value: number;
    url: string;
    duration: number;
    currentTime: number;
  };
}>();

const precent = computed(() => {
  return Math.ceil((props.data.currentTime / props.data.duration) * 100) || 0;
});

//点击切换集数
const handleClick = () => {
  selectedVideo.value.history = props.data.value;
};
</script>

<style scoped lang="scss">
section {
  background-color: rgba(#fff, 0.06);

  transition: 0.1s;

  &:hover {
    background-color: var(--main-color);

    > span {
      color: #222;
    }
  }
}

.active {
  background-color: var(--main-color);

  > span {
    color: #222;
  }
}
</style>
