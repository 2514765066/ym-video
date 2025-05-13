<template>
  <section class="title-bar flex items-center pl-3 gap-1">
    <Nav />

    <Tip content="添加视频">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center active"
        @click="handleAdd"
      >
        <Icon name="add" color="#ffffffcf" size="18" />
      </button>
    </Tip>

    <VideoTitle v-if="route.path.includes('/play')" />

    <Menu :data="menu" placement="bottom" :offset="12">
      <button
        class="w-6 h-6 rounded-md flex items-center justify-center active ml-auto"
      >
        <Tip content="导入等操作..." placement="left">
          <Icon name="more" size="18" color="#ffffffcf"></Icon>
        </Tip>
      </button>
    </Menu>
  </section>
</template>

<script setup lang="ts">
import Nav from "./Nav.vue";
import VideoTitle from "./VideoTitle.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { Tip, Menu } from "@/components/Tooltip";
import { useVideoStore } from "@/stores/useVideoStore";

const { exportConfig, importConfig, removeConfig } = useVideoStore();
const route = useRoute();

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "导入播放记录",
        icon: "import",
        onSelect: () => {
          importConfig();
        },
      },
      {
        title: "导出所有播放记录",
        icon: "export",
        onSelect: () => {
          exportConfig();
        },
      },
      {
        title: "清空所有播放记录",
        icon: "remove",
        hoverColor: "#EB5757",
        onSelect() {
          removeConfig();
          eventEmitter.emit("success:show", "已清空所有播放记录");
        },
      },
    ],
  },
];

const handleAdd = () => {
  eventEmitter.emit("add:show");
};
</script>

<style scoped lang="scss">
.title-bar {
  grid-area: title-bar;
  padding-right: 140px;

  -webkit-app-region: drag;
  * {
    -webkit-app-region: no-drag;
  }

  :deep(.active) {
    cursor: pointer;
    &:hover {
      background-color: #262626;
    }
  }
}
</style>
