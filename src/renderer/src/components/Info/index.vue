<template>
  <el-skeleton
    style="aspect-ratio: 3/4.2; min-width: 160px; max-width: 185px; width: 100%"
    :loading="loading"
    animated
  >
    <template #template>
      <el-skeleton-item
        variant="image"
        style="width: 100%; height: 100%; border-radius: 0.5rem"
      />
    </template>

    <li class="flex flex-col relative overflow-hidden rounded-lg">
      <section
        class="w-6 h-6 absolute more top-2.5 right-2.5 rounded-full opacity-0 backdrop-blur-lg flex justify-center items-center cursor-pointer"
        @click="moreHandler"
        ref="moreRef"
        v-if="remove"
      >
        <Icon name="more" color="#fff" size="20" />
      </section>

      <img :src="data.pic" class="w-full h-full" />

      <div
        class="absolute bottom-0 w-full p-2 flex justify-between items-end gap-1"
      >
        <p class="text-sm text-color">{{ data.name }}</p>

        <Icon
          name="play"
          color="#fff"
          size="40"
          class="cursor-pointer"
          @click="handlePlay"
        />
      </div>
    </li>
  </el-skeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import { VideoInfo, MovieInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useLoading } from "@/utils/loading";

const videoStore = useVideoStore();
const updateLoading = useLoading(videoStore.update);

const props = withDefaults(
  defineProps<{
    data: VideoInfo | MovieInfo;
    loading?: boolean;
    remove?: boolean;
  }>(),
  {
    loading: false,
    remove: false,
  }
);

const emits = defineEmits<{
  play: [];
}>();

const moreRef = ref<HTMLElement>();

//处理更多
const moreHandler = () => {
  if (!moreRef.value) {
    return;
  }

  const rect = moreRef.value.getBoundingClientRect();

  eventEmitter.emit("menu:show", {
    width: 250,
    x: rect.x + 250 > window.innerWidth ? rect.x - 250 + rect.width : rect.x,
    y: rect.y,
    data: [
      {
        children: [
          {
            title: "播放视频",
            icon: "play1",
            onSelect() {
              emits("play");
            },
          },
          {
            title: "更新集数",
            icon: "update",
            async onSelect() {
              try {
                await updateLoading(props.data.name);
                eventEmitter.emit("success:show", "更新成功");
              } catch {
                eventEmitter.emit("error:show", "更新失败");
              }
            },
          },
        ],
      },
      {
        children: [
          {
            title: "删除记录",
            icon: "remove",
            onSelect() {
              videoStore.remove(props.data.name);
              eventEmitter.emit("success:show", "删除成功");
            },
          },
        ],
      },
    ],
  });
};

//点击播放
const handlePlay = () => {
  emits("play");
};
</script>

<style scoped lang="scss">
li {
  min-width: 160px;
  max-width: 185px;
  width: 100%;
  aspect-ratio: 3/4.2;

  box-shadow: 0 1px 5px 2px rgba(#000, 0.1);

  .more {
    background-color: rgba(#252525, 0.5);
    transition: 0.1s opacity;
  }

  > div:last-child {
    height: 40px;
    background-color: #252525;
    box-shadow: 0 -1px 50px 50px #252525;

    > i {
      display: none;
    }
  }

  &:hover {
    > section {
      opacity: 1;
    }

    > div:last-child {
      box-shadow: 0 -1px 50px 50px #252525;

      > i {
        display: block;
      }
    }
  }
}
</style>
