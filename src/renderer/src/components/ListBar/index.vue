<template>
  <section
    class="flex flex-col items-center gap-1 fixed top-1/2 left-3 -translate-y-1/2 p-1 rounded-xl z-50"
  >
    <Tip content="ym-video" placement="right">
      <div class="w-10 h-10 flex items-center justify-center">
        <img src="@/assets/icon.png" class="w-6 h-6" />
      </div>
    </Tip>

    <Tip content="搜索 Ctrl+S" placement="right">
      <div
        class="search w-10 h-10 flex items-center justify-center cursor-pointer rounded-xl transition-all"
        @click="handleSearch"
      >
        <Icon name="search" size="22" color="#ffffffcf" />
      </div>
    </Tip>

    <Item v-for="item in data" :data="item" />
  </section>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { Tip } from "@/components/Tooltip";
import Item from "./Item.vue";
import eventEmitter from "@/hooks/eventEmitter";

const data = [
  {
    title: "主页",
    icon: "home",
    to: "/home",
  },
  {
    title: "发现",
    icon: "film",
    to: "/film",
  },
];

const handleSearch = () => {
  eventEmitter.emit("search:show");
};
</script>

<style scoped lang="scss">
section {
  backdrop-filter: blur(100px);
  background-color: rgba(#222, 0.8);

  box-shadow: rgb(48, 48, 46) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0.48) 0px 24px 48px -8px,
    rgba(0, 0, 0, 0.24) 0px 4px 12px -1px;

  .search {
    &:hover {
      background-color: rgba(#fff, 0.81);

      i {
        background-color: #202020;
      }
    }
  }
}
</style>
