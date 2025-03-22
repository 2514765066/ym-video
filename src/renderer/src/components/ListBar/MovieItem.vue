<template>
  <section
    class="cursor-pointer flex items-center px-2 gap-2 rounded-md w-full"
    :class="{ active: route.path == '/play' && selectedName == data.name }"
    @click="clickHandler"
  >
    <img :src="data.pic" class="rounded-full w-5 h-5" v-if="data.pic" />
    <div class="rounded-full w-5 h-5 shrink-0 bg-gray-700" v-else></div>

    <span
      class="text-sm text-ellipsis overflow-hidden mr-auto whitespace-nowrap"
    >
      {{ data.name }}
    </span>

    <ToolTip content="更多操作" placement="right">
      <button
        class="w-5 h-5 rounded flex items-center justify-center opacity-0"
        @click.stop="moreHandler"
        ref="moreRef"
      >
        <Icon size="16" color="#8A8A8A" name="more" />
      </button>
    </ToolTip>
  </section>
</template>

<script setup lang="ts">
import ToolTip from "@/lib/ToolTip/index.vue";
import { VideoInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useLoading } from "@/utils/loading";

const { remove, update } = useVideoStore();
const { selectedName } = storeToRefs(useVideoStore());
const route = useRoute();
const router = useRouter();
const updateLoading = useLoading(update);

const props = defineProps<{
  data: VideoInfo;
}>();

const moreRef = ref<HTMLElement>();

//点击元素
const clickHandler = () => {
  selectedName.value = props.data.name;

  router.push("/play");
};

//点击更多
const moreHandler = () => {
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
            title: "播放视频",
            icon: "play1",
            onSelect: clickHandler,
          },
          {
            title: "更新集数",
            icon: "update",
            hidden: !props.data.pic,
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
              remove(props.data.name);
              eventEmitter.emit("success:show", "删除成功");
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
  }
}

.active {
  background-color: #2c2c2c;

  > span {
    color: rgba(#fff, 0.81);
  }
}
</style>
