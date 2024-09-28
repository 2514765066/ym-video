<template>
  <section class="header wh-100 v-n-c p-2">
    <el-tooltip content="回退">
      <el-button text @click="handleBack" :disabled="isLoading">
        <img src="@/assets/svg/back.svg" width="18" height="18" />
      </el-button>
    </el-tooltip>

    <el-tooltip content="选择">
      <el-button text @click="handleSelect" :disabled="isLoading">
        <img src="@/assets/svg/select.svg" width="20" height="20" />
      </el-button>
    </el-tooltip>

    <Address />

    <el-tooltip content="关闭">
      <el-button text @click="handleClose" style="margin-left: auto">
        <img src="@/assets/svg/close.svg" width="15" height="15" />
      </el-button>
    </el-tooltip>
  </section>
</template>

<script setup lang="ts">
import Address from "@/components/Address.vue";
import { ElButton, ElTooltip } from "element-plus";

defineProps<{
  isLoading: boolean;
}>();

const emits = defineEmits(["back", "select", "close"]);

const handleBack = () => {
  emits("back");
};

const handleSelect = () => {
  emits("select");
};

const handleClose = () => {
  emits("close");
};
</script>

<style scoped lang="scss">
.header {
  -webkit-app-region: drag;

  > .el-button {
    width: 28px !important;
    height: 28px !important;
    padding: 10px !important;
  }
}
</style>
