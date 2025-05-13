<template>
  <section
    class="cursor-pointer flex items-center px-2 gap-2 rounded-md w-full"
    :class="{ active: route.path == '/play' && selectedName == data.name }"
    @click="handleClick"
  >
    <img :src="data.pic" class="rounded-full w-5 h-5" v-if="data.pic" />
    <div class="rounded-full w-5 h-5 shrink-0 bg-gray-700" v-else></div>

    <span
      class="text-sm text-ellipsis overflow-hidden mr-auto whitespace-nowrap"
    >
      {{ data.name }}
    </span>

    <Menu :data="menu">
      <button
        class="w-5 h-5 rounded flex items-center justify-center opacity-0"
        @click.stop
      >
        <Tip content="更多操作" placement="right">
          <Icon size="16" color="#8A8A8A" name="more" />
        </Tip>
      </button>
    </Menu>
  </section>
</template>

<script setup lang="ts">
import { VideoInfo } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useLoading } from "@/utils/loading";
import { Menu, Tip } from "@/components/Tooltip";

const { remove, update, exportConfig } = useVideoStore();
const { selectedName } = storeToRefs(useVideoStore());
const route = useRoute();
const router = useRouter();
const updateLoading = useLoading(update);

const props = defineProps<{
  data: VideoInfo;
}>();

//点击元素
const handleClick = () => {
  selectedName.value = props.data.name;

  router.push("/play");
};

const menu = [
  {
    title: "更多操作",
    children: [
      {
        title: "更新集数",
        icon: "update",
        hidden: !props.data.pic,
        onSelect() {
          updateLoading(props.data.name);
        },
      },
      {
        title: "导出记录",
        icon: "export",
        onSelect() {
          exportConfig(props.data.name);
        },
      },
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
