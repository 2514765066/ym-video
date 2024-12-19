<template>
  <section class="title-bar w-100 v-n-c g-2">
    <el-tooltip content="刷新" effect="light" :hide-after="0">
      <button @click="emits('reload')">
        <img src="@/assets/svg/reload.svg" width="21px" />
      </button>
    </el-tooltip>

    <el-tooltip content="登录完成" effect="light" :hide-after="0">
      <button @click="emits('select')">
        <img src="@/assets/svg/select.svg" width="20px" />
      </button>
    </el-tooltip>

    <button @click="emits('close')" class="ml">
      <img src="@/assets/svg/close.svg" width="16" />
    </button>
  </section>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";

const emits = defineEmits(["close", "select", "reload"]);
</script>

<style scoped lang="scss">
.title-bar {
  height: 38px;
  padding: 0 0.5rem;
  -webkit-app-region: drag;

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
