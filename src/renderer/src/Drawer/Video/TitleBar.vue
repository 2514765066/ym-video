<template>
  <section class="title-bar w-100 v-n-c g-1">
    <ElTooltip :hide-after="0" content="更新集数">
      <button class="button2" @click="emits('update')">
        <img src="@/assets/svg/update1.svg" width="20px" />
      </button>
    </ElTooltip>

    <aside class="fs-12 p-a c-ccc v-c-c o-h px-1r">
      <span class="ellipsis">
        {{ selectedVideo?.name }}
      </span>
    </aside>

    <button @click="emits('close')" class="button2 ml">
      <img src="@/assets/svg/close.svg" width="16" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());

const emits = defineEmits(["close", "update"]);
</script>

<style scoped lang="scss">
.title-bar {
  height: 38px;
  -webkit-app-region: drag;

  > aside {
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
