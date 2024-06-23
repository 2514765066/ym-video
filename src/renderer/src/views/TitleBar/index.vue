<template>
  <section class="v-n-c">
    <img src="@/assets/icon.png" width="20px" />
    <span class="c-ccc ml-2 fs-18">ym-video</span>

    <div class="fs-12 p-a c-ccc click v-c-c" @click="selectVideoShow">
      {{ selectedVideo?.name || "未选择视频" }}
    </div>

    <el-tooltip content="查看支持视频网站" placement="bottom">
      <button class="h-100 ml mr-1" @click="helpShow">
        <img src="@/assets/help.svg" />
      </button>
    </el-tooltip>

    <el-tooltip content="设置" placement="bottom">
      <button class="h-100" @click="setShow">
        <img src="@/assets/set.svg" />
      </button>
    </el-tooltip>

    <aside class="v-n-c h-100">
      <div class="h-100 v-c-c click" @click="minimize">
        <img src="@/assets/minimize.svg" />
      </div>

      <div class="v-c-c click h-100" @click="maximize">
        <img src="@/assets/restore.svg" v-if="isFullScreen" />
        <img src="@/assets/maximize.svg" v-else />
      </div>

      <div class="h-100 v-c-c click" @click="close">
        <img src="@/assets/close.svg" />
      </div>
    </aside>
  </section>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import eventEmitter from "@/hooks/eventEmitter";
import { useListStore } from "@/stores/useListStore";
import { close, maximize, minimize, isFullScreen } from "@/hooks/useControls";

const { selectedVideo } = storeToRefs(useListStore());

function helpShow() {
  eventEmitter.emit("help:show");
}

function setShow() {
  eventEmitter.emit("set:show");
}

function selectVideoShow() {
  eventEmitter.emit("select:video:show");
}
</script>

<style scoped lang="scss">
section {
  $hoverBg: #373737;
  padding-left: 0.5rem;
  height: 38px;
  -webkit-app-region: drag;

  > span {
    font-family: logo;
  }

  > div {
    width: 600px;
    height: 26px;
    border: 1px solid #454545;
    border-radius: 0.5rem;
    background-color: #2a2a2a;
    left: 50%;
    transform: translateX(-50%);
    z-index: 999;
    transition: 0.15s;

    &:hover {
      background-color: #313131;
      border-color: #5b5b5b;
    }
  }

  > button {
    width: 30px;
    height: 30px;
    border-radius: 0.5rem;
    transition: 0.15s;

    > img {
      width: 18px;
      height: 18px;
    }

    &:hover {
      background-color: $hoverBg;
    }
  }

  > aside {
    > div {
      width: 2.8rem;
      border-radius: 0.5rem;
      transition: 0.15s;

      &:hover {
        background-color: $hoverBg;
      }

      > img {
        width: 14px;
        height: 14px;
      }
    }

    > div:last-child {
      &:hover {
        background-color: #c42b1c;
      }
    }
  }
}
</style>
