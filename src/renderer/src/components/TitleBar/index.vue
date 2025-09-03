<template>
  <section class="title-bar flex items-center pl-3 gap-1">
    <Nav />

    <Tip content="添加视频">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center active"
        @click="handleAdd"
      >
        <Icon name="add" color="#ffffffcf" size="18" />
      </button>
    </Tip>

    <VideoTitle v-if="route.path.includes('/play')" />
  </section>
</template>

<script setup lang="ts">
import Nav from "./Nav.vue";
import VideoTitle from "./VideoTitle.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { Tip } from "@/components/Tooltip";

const route = useRoute();

const handleAdd = () => {
  eventEmitter.emit("add:show");
};
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 140px;

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }

  :deep(.active) {
    cursor: pointer;
    &:hover {
      background-color: #262626;
    }
  }
}
</style>
