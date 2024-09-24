<template>
  <section class="v-n-c g-2">
    <el-tooltip content="编辑" :hide-after="0">
      <button @click="handleEdit">
        <img src="@/assets/svg/edit.svg" width="16px" />
      </button>
    </el-tooltip>

    <el-tooltip content="刷新" :hide-after="0">
      <button @click="handleReload">
        <img src="@/assets/svg/reload.svg" width="17px" />
      </button>
    </el-tooltip>

    <el-tooltip content="用网页打开" :hide-after="0">
      <button @click="handleBrowser">
        <img src="@/assets/svg/browser.svg" width="15px" />
      </button>
    </el-tooltip>
  </section>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import eventEmitter from "@/hooks/eventEmitter";
import { useVideoStore } from "@/stores/useVideoStore";
import { useVideo } from "@/hooks/useVideo";

const { reload } = useVideo();
const { selectedVideo } = storeToRefs(useVideoStore());

//处理编辑
const handleEdit = () => {
  eventEmitter.emit("edit:show");
};

//处理刷新
const handleReload = () => {
  reload();
};

//处理网页打开
const handleBrowser = () => {
  eventEmitter.emit("videoSite:show", selectedVideo.value?.url);
};
</script>

<style scoped lang="scss">
section {
  > button {
    $size: 30px;

    width: $size;
    height: $size;
    border-radius: 0.5rem;
    transition: 0.15s;

    &:hover {
      background-color: #373737;
    }
  }
}
</style>
