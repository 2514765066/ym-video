<template>
  <TitleBar></TitleBar>
  <Video></Video>

  <Dialog></Dialog>
  <Command></Command>
</template>

<script setup lang="ts">
import Video from "@/views/Video/index.vue";
import TitleBar from "@/views/TitleBar/index.vue";
import Dialog from "@/components/Dialog/index.vue";
import Command from "@/components/Command/index.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { ElMessage } from "element-plus";

eventEmitter.on("error:show", (message: string) => {
  ElMessage({
    message,
    type: "error",
    grouping: true,
  });
});

eventEmitter.on("success:show", (message: string) => {
  ElMessage({
    message,
    type: "success",
    grouping: true,
  });
});
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  background-color: #232323;
  display: flex;
  flex-direction: column;

  * {
    user-select: none;
  }
}

.el-dialog {
  border-radius: 0.5rem !important;
}

.el-message-box {
  border-radius: 0.5rem !important;
}

.c-ccc {
  color: #ccc;
}

.px-1r {
  padding: 0 1rem;
}

.el-time-panel__footer {
  display: none;
}
</style>
