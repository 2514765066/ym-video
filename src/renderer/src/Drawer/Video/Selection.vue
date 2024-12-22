<template>
  <ElScrollbar
    style="width: 265px"
    v-if="isOpen && selectedVideo!.url.length > 1"
  >
    <p class="c-ccc mb-2">选集</p>

    <aside class="g-1 v fw-w">
      <div
        v-for="(url, index) of selectedVideo?.url"
        class="v-c-c"
        @click="handleClick(url)"
        :class="{ active: selectedVideo?.history === url }"
      >
        <span class="fw-b c-ccc">{{ index + 1 }}</span>
      </div>
    </aside>
  </ElScrollbar>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import { useVideoStore } from "@/stores/useVideoStore";
import { isOpen } from "./index";

const { selectedVideo } = storeToRefs(useVideoStore());

//处理点击集数
const handleClick = (url: string) => {
  selectedVideo.value!.history = url;
};
</script>

<style scoped lang="scss">
aside {
  > div {
    $size: 50px;
    width: $size;
    height: $size;
    border-radius: 5px;
    background-color: #131313;
    border: 1px solid #363b3f;
    transition: 0.1s;

    &:hover {
      background-color: #313131;
    }
  }

  .active {
    border-color: #ff8232;

    > span {
      color: #ff8232;
    }
  }
}
</style>
