<template>
  <main class="h">
    <header>
      <p class="fs-40">设置</p>
    </header>

    <ElScrollbar class="f-1" view-class="h " view-style="gap:2px;">
      <p class="fs-14">历史</p>

      <Row label="最大历史记录个数" des="打开应用时保留最大历史记录数">
        <template #icon>
          <img src="@/assets/svg/history.svg" width="28px" />
        </template>

        <span class="fs-14 c-ccc mr-2">{{ data.historyCount }}</span>
        <Slider :width="200" :step="10" :min="10" v-model="data.historyCount" />
      </Row>

      <p class="fs-14 mt-2r">播放</p>

      <Row label="cookie" des="如果无法搜索和播放请使用登录自己的豆瓣">
        <template #icon>
          <img src="@/assets/svg/cookie.svg" width="28px" />
        </template>

        <Button @click="handleLogin">登录</Button>
      </Row>

      <p class="fs-14 mt-2r">关于</p>

      <Row label="ym-video" des="免费视频播放器">
        <template #icon>
          <img src="@/assets/icon.png" width="28px" />
        </template>

        <span class="c-ccc fs-13">版本 {{ version }}</span>
      </Row>

      <Row label="更新" des="进入github官网自行下载">
        <template #icon>
          <img src="@/assets/svg/update.svg" width="28px" />
        </template>

        <Button @click="handleUpdate">打开</Button>
      </Row>
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import Slider from "@/Lib/Slider/Index.vue";
import Row from "@/Lib/Row/index.vue";
import Button from "@/Lib/Button/index.vue";
import { ElScrollbar } from "element-plus";
import { useConfigStore } from "@/stores/useConfigStore";
import eventEmitter from "@/hooks/eventEmitter";

const { data } = storeToRefs(useConfigStore());

const version = __APP_VERSION__;

//处理登录
const handleLogin = () => {
  eventEmitter.emit(
    "videoSite:show",
    "https://accounts.douban.com/passport/login",
    async (webview, close) => {
      const cookie = await webview.executeJavaScript("document.cookie");

      if (!cookie) {
        eventEmitter.emit("error:show", "请登录后再提交");
        return;
      }

      data.value.cookie = cookie;

      eventEmitter.emit("success:show", "登录成功");

      close();
    }
  );
};

//处理更新
const handleUpdate = () => {
  electron.ipcRenderer.send(
    "openURL",
    "https://github.com/2514765066/ym-video/releases"
  );
};
</script>

<style scoped lang="scss">
main {
  padding-left: 3.5rem;
  padding-right: 5px;

  > header {
    height: 40px;
    margin: 12px 0 2rem;
  }

  > div {
    padding-right: 3.5rem;
  }
}
</style>
