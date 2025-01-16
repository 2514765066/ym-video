<template>
  <main class="h">
    <header>
      <p class="fs-40">设置</p>
    </header>

    <ElScrollbar class="f-1">
      <div class="h content">
        <p class="fs-14">关于</p>

        <Row label="更新" des="进入github官网自行下载">
          <template #icon>
            <img src="@/assets/svg/update.svg" width="28px" />
          </template>

          <Button @click="handleUpdate">打开</Button>
        </Row>

        <Row label="ym-video" des="免费视频播放器">
          <template #icon>
            <img src="@/assets/icon.png" width="28px" />
          </template>

          <span class="c-ccc fs-13">版本 {{ version }}</span>
        </Row>
      </div>
    </ElScrollbar>
  </main>
</template>

<script setup lang="ts">
import Row from "@/Lib/Row/index.vue";
import Button from "@/Lib/Button/index.vue";
import { ElScrollbar } from "element-plus";

const version = __APP_VERSION__;

//处理更新
const handleUpdate = () => {
  api.openUrl("https://github.com/2514765066/ym-video/releases");
};
</script>

<style scoped lang="scss">
main {
  padding-right: 5px;

  > header {
    height: 40px;
    padding: 0 3.4rem;
    margin: 12px 0 2rem;

    > p {
      height: inherit;
    }
  }

  .content {
    padding: 0 3.4rem;
    gap: 2px;
  }
}
</style>
