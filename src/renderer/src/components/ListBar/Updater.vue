<template>
  <section
    class="updater p-2 w-full rounded-md flex flex-col gap-2"
    v-if="visible && version != ''"
  >
    <header class="flex items-center gap-2">
      <Icon name="update" size="20" color="#D5D5D5" />

      <strong class="text-sm text-color">发现新版本v{{ version }}</strong>

      <button
        class="w-6 h-6 ml-auto rounded-md flex justify-center items-center"
        @click="handleClose"
      >
        <Icon class="rotate-45" name="add" size="20" color="#D5D5D5" />
      </button>
    </header>

    <main class="flex items-center gap-2">
      <span class="text-sm text-color">{{ progress }}%</span>

      <section class="w-full h-1 relative">
        <div class="h-full absolute left-0 top-0"></div>
      </section>
    </main>

    <el-button
      class="w-full"
      color="#2383E2"
      :dark="true"
      native-type="submit"
      size="small"
      round
      @click="handleClick"
    >
      手动下载
    </el-button>
  </section>
</template>

<script setup lang="ts">
import { ElButton } from "element-plus";
import { downloadUrl } from "@/router/base";

//是否显示
const visible = ref(true);

//最新版本
const version = ref("");

//进度
const progress = ref(0);

//关闭
const handleClose = () => {
  visible.value = false;
};

//手动更新
const handleClick = () => {
  api.openUrl(
    `${downloadUrl}/v${version.value}/ym-video-${version.value}-setup.exe`
  );
};

ipcRenderer.on("updateAvailable", (_, _version) => {
  version.value = _version;
});

ipcRenderer.on("downloadProgress", (_, percent) => {
  progress.value = percent;
});
</script>

<style scoped lang="scss">
.updater {
  border: 1px solid rgba(255, 255, 255, 0.055);
  box-shadow: rgba(0, 0, 0, 0.16) 0px 4px 12px -2px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px;

  > header {
    button {
      transition: 0.1s;

      &:hover {
        background-color: #2c2c2c;
      }
    }
  }

  > main {
    > section {
      background-color: #505050;
      border-radius: 2px;

      > div {
        width: calc(v-bind("progress") * 1%);
        background-color: #2383e2;
        border-radius: 2px;
      }
    }
  }
}
</style>
