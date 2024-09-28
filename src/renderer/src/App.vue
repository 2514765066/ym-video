<template>
  <TitleBar />

  <section class="app f-1 o-h v-c-c">
    <RouterView />
  </section>

  <VideoSiteView />
  <CommandMenu />
  <Edit />
</template>

<script setup lang="ts">
import Edit from "@/components/Edit.vue";
import VideoSiteView from "@/views/VideoSiteView/Index.vue";
import TitleBar from "@/views/TitleBarView.vue";
import CommandMenu from "@/components/CommandMenu/Index.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { ElMessage } from "element-plus";
import { useUpdate } from "@/hooks/useUpdate";

useUpdate();

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

electron.ipcRenderer.on("msg", (_, msg) => {
  console.log(msg);
});
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  background-color: #1f1f1f;
  display: flex;
  flex-direction: column;

  * {
    user-select: none;
  }
}

.app {
  margin: 0 0.5rem 0.5rem;
  border-radius: 0.5rem;
  background-color: #131313;
  border: 1px solid #393839;
}
</style>
