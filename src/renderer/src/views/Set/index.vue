<template>
  <main class="h">
    <header>
      <p class="fs-40">设置</p>
    </header>

    <ElScrollbar class="f-1">
      <div class="h content">
        <Row
          :label="`ym-video - ${latestVersion}`"
          height="52"
          class="mb-2r"
          v-if="latestVersion"
        >
          <span class="c-ccc fs-13" v-if="percentage == 0">等待下载中</span>

          <span class="c-ccc fs-13" v-else-if="percentage != 100">
            正在下载 - {{ percentage }}%
          </span>

          <span class="c-ccc fs-13" v-else>等待重启完成更新</span>
        </Row>

        <p class="fs-14 mb-1">关于</p>

        <Row label="手动更新" des="进入github官网自行下载">
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
import { useVersionStore } from "@/stores/useVersionStore";

const { version } = useVersionStore();
const { latestVersion, percentage } = storeToRefs(useVersionStore());

//手动更新
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
