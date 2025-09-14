<template>
  <section class="history-info relative overflow-hidden rounded-lg">
    <Info :data="data" @play="handlePlay" />

    <Menu :data="menu">
      <button
        class="w-6 h-6 absolute top-2.5 right-2.5 p-1 rounded-full flex justify-center items-center"
      >
        <Icon name="more" size="20" />
      </button>
    </Menu>

    <div class="absolute bottom-0 left-0 h-1 rounded-full max-w-full"></div>
  </section>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { Menu } from "@/components/Tooltip";
import Info from "./index.vue";
import { VideoInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";

const { remove } = useVideoStore();

const { play } = useVideoStore();

const props = defineProps<{
  data: VideoInfo;
}>();

//播放百分比
const playPercent = computed(() => {
  if (!props.data.duration || !props.data.duration) {
    return 0;
  }

  return (props.data.currentTime / props.data.duration) * 100;
});

//处理点击
const handlePlay = async () => {
  play(props.data.name);
};

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "删除记录",
        icon: "remove",
        hoverColor: "#EB5757",
        onSelect() {
          remove(props.data.name);
          eventEmitter.emit("success:show", "删除成功");
        },
      },
    ],
  },
];
</script>

<style scoped lang="scss">
.history-info {
  box-shadow: 0 1px 5px 2px rgba(#000, 0.2);

  transition: transform 0.1s;

  > button {
    background-color: rgba(#000, 0.4);
    backdrop-filter: blur(100px);
  }

  > div {
    width: calc(v-bind("playPercent") * 1%);
    background-color: rgba(#fff, 0.8);
  }

  &:hover {
    transform: scale(1.05);
  }
}
</style>
