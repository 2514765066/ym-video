<template>
  <section class="title-bar flex items-center pl-3 gap-1">
    <ToolTip content="返回">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center"
        :class="{ active: canGoBack }"
        @click="back"
      >
        <Icon
          name="arrow1"
          :color="canGoBack ? '#ffffffcf' : '#646464'"
          size="18"
        />
      </button>
    </ToolTip>

    <ToolTip content="前进">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center"
        :class="{ active: canGoForward }"
        @click="forward"
      >
        <Icon
          name="arrow1"
          :color="canGoForward ? '#ffffffcf' : '#646464'"
          size="18"
          style="transform: rotate(180deg)"
        />
      </button>
    </ToolTip>

    <!-- <ToolTip content="播放第三方链接">
      <button class="w-6 h-6 rounded-md active" @click="">
        <Icon name="add" color="#ffffffcf" size="18" />
      </button>
    </ToolTip> -->

    <div
      class="h-6 rounded-md flex items-center gap-2 px-1.5"
      v-if="route.path == '/play'"
    >
      <img :src="selectedVideo!?.pic" class="rounded-full shrink-0 w-5 h-5" />
      <span class="text-sm text-color">{{ selectedVideo?.name }}</span>
    </div>
  </section>
</template>

<script setup lang="ts">
import ToolTip from "@/lib/ToolTip/index.vue";
import { useVideoStore } from "@/stores/useVideoStore";

const { selectedVideo } = storeToRefs(useVideoStore());
const router = useRouter();
const route = useRoute();

const canGoBack = ref(false);
const canGoForward = ref(false);

router.afterEach(() => {
  canGoBack.value = history.length > 1 && history.state.position != 0;
  canGoForward.value =
    history.state && history.state.position < history.length - 1;
});

const back = () => {
  router.back();
};

const forward = () => {
  router.forward();
};
</script>

<style scoped lang="scss">
.title-bar {
  -webkit-app-region: drag;

  * {
    -webkit-app-region: no-drag;
  }

  > button {
    cursor: default;
    transition: 0.1s;
  }

  > div {
    transition: 0.1s;

    &:hover {
      background-color: #262626;
    }
  }

  .active {
    cursor: pointer;
    &:hover {
      background-color: #262626;
    }
  }
}
</style>
