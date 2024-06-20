<template>
  <TitleBar></TitleBar>
  <Video></Video>

  <Create></Create>
  <Command></Command>
  <Set></Set>
  <Edit></Edit>
</template>

<script setup lang="ts">
import Edit from "@/components/Edit/index.vue";
import Set from "@/components/Set/index.vue";
import Video from "@/views/Video/index.vue";
import TitleBar from "@/views/TitleBar/index.vue";
import Create from "@/components/Create/index.vue";
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
* {
  -webkit-app-region: no-drag;
}
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
