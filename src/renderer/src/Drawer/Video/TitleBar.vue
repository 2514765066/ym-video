<template>
  <section class="title-bar w-100 v-n-c g-1">
    <el-tooltip content="切换线路" :hide-after="0" :disabled="true">
      <button
        @click="change"
        class="button2"
        :disabled="true"
        style="cursor: not-allowed"
      >
        <img
          src="@/assets/svg/change.svg"
          width="18px"
          style="filter: brightness(50%)"
        />
      </button>
    </el-tooltip>

    <el-tooltip content="刷新" :hide-after="0">
      <button @click="reload" class="button2 mr">
        <img src="@/assets/svg/reload.svg" width="19px" />
      </button>
    </el-tooltip>

    <section class="fs-12 p-a c-ccc v-c-c o-h px-1r">
      <span class="ellipsis">
        {{ selectedVideo?.name }}
      </span>
    </section>

    <el-tooltip :content="isOpen ? '关闭选集' : '打开选集'" :hide-after="0">
      <button
        @click="isOpen = !isOpen"
        class="button2"
        v-if="selectedVideo!.url.length > 1"
      >
        <img src="@/assets/svg/list.svg" width="20px" />
      </button>
    </el-tooltip>

    <button @click="emits('close')" class="button2">
      <img src="@/assets/svg/close.svg" width="16" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { useLineStore } from "@/stores/useLineStore";
import { reload, isOpen } from "./index";

import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());
const { change } = useLineStore();

const emits = defineEmits(["close"]);
</script>

<style scoped lang="scss">
.title-bar {
  height: 38px;
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
}
</style>
