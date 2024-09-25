<template>
  <el-drawer
    v-model="visible"
    direction="btt"
    size="100%"
    class="Drawer"
    :show-close="false"
    @open="handleOpen"
    @close="handleClose"
  >
    <div class="wh-100 v-c-c">
      <webview
        class="wh-100"
        id="search"
        :src="src"
        allowpopups
        v-show="isShow"
      ></webview>

      <img src="@/assets/svg/loading.svg" class="loading" v-show="!isShow" />
    </div>

    <template #header="{ close }">
      <div class="header wh-100 v-n-c p-2">
        <el-tooltip content="回退">
          <el-button text @click="handleBack" :disabled="!isShow">
            <svg viewBox="0 0 1024 1024" width="18" height="18">
              <path
                d="M874.666667 480H224L514.133333 170.666667c12.8-12.8 10.666667-34.133333-2.133333-44.8s-32-10.666667-44.8 2.133333l-341.333333 362.666667c-2.133333 2.133333-4.266667 6.4-6.4 8.533333-2.133333 4.266667-2.133333 6.4-2.133334 10.666667s0 8.533333 2.133334 10.666666c2.133333 4.266667 4.266667 6.4 6.4 8.533334l341.333333 362.666666c6.4 6.4 14.933333 10.666667 23.466667 10.666667 8.533333 0 14.933333-2.133333 21.333333-8.533333 12.8-12.8 12.8-32 2.133333-44.8L224 544H874.666667c17.066667 0 32-14.933333 32-32s-14.933333-32-32-32z"
                fill="#ffffff"
              ></path>
            </svg>
          </el-button>
        </el-tooltip>

        <el-tooltip content="选择">
          <el-button text @click="handleAdd" :disabled="!isShow">
            <svg viewBox="0 0 1024 1024" width="20" height="20">
              <path
                d="M409.6 757.333333c-8.533333 0-17.066667-2.133333-23.466667-8.533333l-238.933333-234.666667c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l215.466667 213.333334 422.4-428.8c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8L430.933333 746.666667c-4.266667 8.533333-12.8 10.666667-21.333333 10.666666z"
                fill="#fff"
              ></path>
            </svg>
          </el-button>
        </el-tooltip>

        <Address />

        <el-tooltip content="关闭">
          <el-button text @click="close" style="margin-left: auto">
            <svg viewBox="0 0 1024 1024" width="19" height="19">
              <path
                d="M556.8 512L832 236.8c12.8-12.8 12.8-32 0-44.8-12.8-12.8-32-12.8-44.8 0L512 467.2l-275.2-277.333333c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l275.2 277.333333-277.333333 275.2c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 14.933333 8.533333 23.466666 8.533333s17.066667-2.133333 23.466667-8.533333L512 556.8 787.2 832c6.4 6.4 14.933333 8.533333 23.466667 8.533333s17.066667-2.133333 23.466666-8.533333c12.8-12.8 12.8-32 0-44.8L556.8 512z"
                fill="#ffffff"
              ></path>
            </svg>
          </el-button>
        </el-tooltip>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import Address from "@/components/Address.vue";
import { ElDrawer, ElButton, ElTooltip } from "element-plus";
import { useVideoSite } from "@/hooks/useVideoSite";
import { WebView } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import { useVideoSiteStore } from "@/stores/useVideoSiteStore";
import eventEmitter from "@/hooks/eventEmitter";

const { initCss } = useVideoSite();
const { selectedVideoSite } = storeToRefs(useVideoSiteStore());
const { add } = useVideoStore();

//webview实例
const el = ref<WebView>();

//网页地址
const src = ref("");

//是否需要保存更新网址
const isUpdateSrc = ref(false);

//抽屉是否可见
const visible = ref(false);

//webview是否可见
const isShow = ref(false);

//处理打开抽屉
const handleOpen = () => {
  if (el.value == null) {
    el.value = document.querySelector("#search") as WebView;
  }
};

//处理添加
const handleAdd = () => {
  const name = el.value!.getTitle();
  const url = el.value!.src;

  add(name, url);

  // router.push("/video");

  visible.value = false;
};

//处理后退
const handleBack = () => {
  const url = selectedVideoSite.value.history.pop();

  el.value!.src = url;
};

//处理关闭
const handleClose = () => {
  isUpdateSrc.value = false;
  src.value = "about:blank";
};

const observer = new MutationObserver(mutationsList => {
  for (const mutation of mutationsList) {
    const el = mutation.target as WebView;

    if (isUpdateSrc.value) {
      selectedVideoSite.value.history.push(el.src);
    }
  }
});

//webview初始化后使用
watch(
  el,
  val => {
    //监视属性
    observer.observe(el.value!, {
      attributes: true,
      attributeFilter: ["src"],
    });

    val?.addEventListener("did-finish-load", async e => {
      const target = e.target as WebView;

      initCss();

      await electron.ipcRenderer.invoke(
        "denyNewWindow",
        target.getWebContentsId()
      );

      isShow.value = true;
    });
  },
  {
    once: true,
  }
);

eventEmitter.on("videoSite:show", url => {
  isUpdateSrc.value = url ? false : true;

  src.value = url || selectedVideoSite.value.url;

  visible.value = true;
});
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
