<template>
  <section
    class="Command fs-12 p-a c-ccc click v-c-c o-h px-1r"
    @click="handleClick"
  >
    <span class="ellipsis">
      {{ selectedVideo?.name || "请选择视频" }}
    </span>
  </section>
</template>

<script setup lang="ts">
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";

const { selectedVideo } = storeToRefs(useVideoStore());

const handleClick = () => {
  eventEmitter.emit("command:show");
};
</script>

<style scoped lang="scss">
.Command {
  width: 600px;
  height: 26px;
  border: 1px solid #454545;
  border-radius: 0.5rem;
  background-color: #2a2a2a;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;

  &:hover {
    background-color: #313131;
    border-color: #5b5b5b;
  }
}
</style>
