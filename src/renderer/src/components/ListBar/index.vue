<template>
  <section class="list-bar h">
    <div class="v mb-2">
      <ElTooltip content="回退" :hide-after="0" :disabled="!canBack">
        <button class="button2 mr-4" @click="handleBack" :disabled="!canBack">
          <svg viewBox="0 0 20 20" width="18px" fill="#fff">
            <path
              d="M9.159 16.867a.5.5 0 1 0 .674-.739l-6.168-5.63h13.831a.5.5 0 0 0 0-1H3.668l6.165-5.629a.5.5 0 0 0-.674-.738L2.243 9.445a.75.75 0 0 0-.24.631a.75.75 0 0 0 .24.477z"
            />
          </svg>
        </button>
      </ElTooltip>

      <Logo />
    </div>

    <Search />

    <ul class="h-100 h g-1 mt-1r">
      <Item
        title="主页"
        to="/home"
        :class="{ active: route.path.includes('/home') }"
      >
        <img src="@/assets/svg/home.svg" />
      </Item>

      <Item
        title="推荐"
        to="/recommend"
        :class="{ active: route.path.includes('/recommend') }"
      >
        <img src="@/assets/svg/tv.svg" />
      </Item>

      <Item
        title="历史"
        to="/history"
        :class="{ active: route.path.includes('/history') }"
        class="mb"
      >
        <img src="@/assets/svg/history.svg" />
      </Item>

      <Item
        :title="`有可用更新v${updateVersion}`"
        @click="handleUpdate"
        v-if="hasUpdate"
      >
        <img src="@/assets/svg/megaphone-fill.svg" class="shake" />
      </Item>

      <Item title="新增功能" @click="handleNew" v-else>
        <img src="@/assets/svg/megaphone.svg" />
      </Item>

      <Item
        title="设置"
        to="/set"
        :class="{ active: route.path.includes('/set') }"
      >
        <img src="@/assets/svg/set.svg" />
      </Item>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import Logo from "./Logo.vue";
import Search from "./Search.vue";
import Item from "./Item.vue";

const route = useRoute();
const router = useRouter();

//有无可用更新
const hasUpdate = ref(false);

//可用更新版本
const updateVersion = ref("");

//是否还能回退
const canBack = ref(false);

//进入路由触发
router.afterEach(() => {
  if (!history.state.back) {
    canBack.value = false;
    return;
  }

  canBack.value = true;
});

//处理回退
const handleBack = () => {
  history.back();
};

//处理新增功能
const handleNew = () => {
  api.openUrl(
    `https://github.com/2514765066/ym-video/releases/tag/v${__APP_VERSION__}`
  );
};

//处理更新
const handleUpdate = () => {
  api.openUrl(
    `https://github.com/2514765066/ym-video/releases/tag/v${updateVersion.value}`
  );
};

onMounted(async () => {
  const res = await electron.ipcRenderer.invoke("checkForUpdates");

  if (res) {
    hasUpdate.value = true;
    updateVersion.value = res;
  }
});
</script>

<style scoped lang="scss">
.list-bar {
  padding: 5px;
  border-right: 1.5px solid #1d1d1d;
  background-color: #202020;

  > div {
    height: 30px;
  }

  > ul {
    .active {
      background-color: #2d2d2d;

      &::before {
        background-color: #ff8232;
      }
    }
  }
}
</style>
