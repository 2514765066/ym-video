<template>
  <section class="title-bar w-100 v-n-c g-2">
    <el-tooltip content="用网页打开" :hide-after="0" effect="light">
      <button @click="handleBrowser">
        <img src="@/assets/svg/link.svg" width="18px" />
      </button>
    </el-tooltip>

    <el-tooltip content="切换线路" :hide-after="0" effect="light">
      <button @click="change">
        <img src="@/assets/svg/change.svg" width="18px" />
      </button>
    </el-tooltip>

    <el-tooltip content="刷新" :hide-after="0" effect="light">
      <button @click="reload">
        <img src="@/assets/svg/reload.svg" width="19px" />
      </button>
    </el-tooltip>

    <section class="fs-12 p-a c-ccc v-c-c o-h px-1r">
      <span class="ellipsis">
        {{ videoStore.selectedVideo?.name }}
      </span>
    </section>

    <button @click="emits('close')" class="ml">
      <img src="@/assets/svg/close.svg" width="16" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { useLineStore } from "@/stores/useLineStore";
import { reload } from "./index";
import eventEmitter from "@/hooks/eventEmitter";
import { useVideoStore } from "@/stores/useVideoStore";

const videoStore = useVideoStore();
const { change } = useLineStore();

const emits = defineEmits(["close"]);

//处理网页打开
const handleBrowser = () => {
  eventEmitter.emit(
    "videoSite:show",
    videoStore.selectedVideo!.url,
    (webview, close) => {
      videoStore.selectedVideo!.url = webview.getURL();

      close();
    }
  );
};
</script>

<style scoped lang="scss">
.title-bar {
  height: 38px;
  padding: 0 0.5rem;
  -webkit-app-region: drag;

  > section {
    width: 600px;
    height: 26px;
    border: 1px solid #454545;
    border-radius: 0.5rem;
    background-color: #2a2a2a;
    left: 50%;
    transform: translateX(-50%);

    &:hover {
      background-color: #313131;
      border-color: #5b5b5b;
    }
  }

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
