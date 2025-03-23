<template>
  <section
    class="cursor-pointer flex items-center px-2 gap-2 rounded-md w-full"
    @click="handleToggle"
  >
    <span class="text-xs mr-auto">最近</span>

    <ToolTip content="更多操作" placement="right">
      <button
        class="w-5 h-5 rounded flex items-center justify-center opacity-0"
        @click.stop="handleMore"
        ref="moreRef"
      >
        <Icon size="14" color="#8A8A8A" name="more" />
      </button>
    </ToolTip>

    <Icon
      name="arrow"
      size="16"
      color="#989898"
      style="transition: 0.1s"
      :class="{ shrink: !visible }"
    />
  </section>

  <AddItem v-if="data.length == 0 && visible" />

  <MovieItem v-if="visible" v-for="item of data.slice(0, 10)" :data="item" />
</template>

<script setup lang="ts">
import MovieItem from "./MovieItem.vue";
import AddItem from "./AddItem.vue";
import eventEmitter from "@/hooks/eventEmitter";
import ToolTip from "@/lib/ToolTip/index.vue";
import { useVideoStore } from "@/stores/useVideoStore";

const { exportConfig, importConfig, removeConfig } = useVideoStore();
const { data } = storeToRefs(useVideoStore());

const visible = ref(true);

const moreRef = ref<HTMLElement>();

//处理显示隐藏
const handleToggle = () => {
  visible.value = !visible.value;
};

const handleMore = () => {
  if (!moreRef.value) {
    return;
  }

  const rect = moreRef.value.getBoundingClientRect();

  eventEmitter.emit("menu:show", {
    width: 250,
    x: rect.x,
    y: rect.y,
    data: [
      {
        children: [
          {
            title: "导入播放记录",
            icon: "import",
            onSelect: importConfig,
          },
          {
            title: "导出播放记录",
            icon: "export",
            hidden: data.value.length == 0,
            onSelect: exportConfig,
          },
        ],
      },
      {
        hidden: data.value.length == 0,
        children: [
          {
            title: "清空播放记录",
            icon: "remove",
            onSelect() {
              removeConfig();
              eventEmitter.emit("success:show", "已清空所有播放记录");
            },
          },
        ],
      },
    ],
  });
};
</script>

<style scoped lang="scss">
section {
  height: 30px;

  transition: 0.1s;

  > span {
    color: #9b9b9b;
  }

  > button {
    transition: 0.1s;

    &:hover {
      background-color: #383838;
    }
  }

  &:hover {
    background-color: #2c2c2c;

    > button {
      opacity: 1;
    }

    > i {
      opacity: 1;
    }
  }
}

.shrink {
  transform: rotate(90deg);
}
</style>
