<template>
  <section class="list-bar flex flex-col items-center gap-1 p-2">
    <Logo />

    <Item title="主页" to="/home" icon="home" />

    <Item title="影视" to="/film" icon="film" />

    <TitleItem title="最近" class="mt-2" @click="toggleHandler">
      <Icon
        name="arrow"
        size="16"
        color="#989898"
        style="transition: 0.1s"
        :class="{ shrink: !listVisible }"
      />
    </TitleItem>

    <AddMovieItem v-if="data.length == 0 && listVisible" />

    <MovieItem
      v-for="item of data.slice(0, 10)"
      :data="item"
      v-if="listVisible"
    />

    <div class="w-full mt-auto flex justify-end">
      <Tooltip content="版本，更新和更多...">
        <button
          class="rounded-md flex items-center justify-center w-7 h-7"
          ref="btnRef"
          @click="handleClick"
        >
          <Icon name="question" size="20" color="#989898"></Icon>
        </button>
      </Tooltip>
    </div>
  </section>
</template>

<script setup lang="ts">
import AddMovieItem from "./AddMovieItem.vue";
import Tooltip from "@/lib/ToolTip/index.vue";
import Logo from "./Logo.vue";
import Item from "./Item.vue";
import TitleItem from "./TitleItem.vue";
import MovieItem from "./MovieItem.vue";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useAppStore } from "@/stores/useAppStore";

const { data } = storeToRefs(useVideoStore());
const { exportConfig, importConfig } = useVideoStore();
const { version } = useAppStore();
const router = useRouter();

const btnRef = ref<HTMLElement>();
const listVisible = ref(true);

const toggleHandler = () => {
  listVisible.value = !listVisible.value;
};

//点击帮助
const handleClick = () => {
  if (!btnRef.value) {
    return;
  }

  const rect = btnRef.value?.getBoundingClientRect();

  eventEmitter.emit("menu:show", {
    width: 220,
    x: rect.x + rect.width - 220,
    y: rect.y - rect.height - 32 * 6,
    data: [
      {
        children: [
          {
            title: "导入记录",
            icon: "import",
            onSelect: importConfig,
          },
          {
            title: "导出记录",
            icon: "export",
            onSelect: exportConfig,
          },
        ],
      },
      {
        children: [
          {
            title: "更新内容",
            icon: "book",
            onSelect() {
              router.push("/doc");
            },
          },
          {
            title: "版本更新",
            icon: "download",
            onSelect() {
              api.openUrl("https://github.com/2514765066/ym-video/releases");
            },
          },
          {
            title: "项目地址",
            icon: "github",
            onSelect() {
              api.openUrl("https://github.com/2514765066/ym-video");
            },
          },
        ],
      },
      {
        children: [
          {
            sub: `当前版本 ${version}`,
          },
        ],
      },
    ],
  });
};
</script>

<style scoped lang="scss">
.list-bar {
  grid-area: list-bar;

  border: 1.5px solid #2b2b2b;
  background-color: #202020;

  > div {
    button {
      transition: 0.1s;

      &:hover {
        background-color: #2c2c2c;
      }
    }
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

.shrink {
  transform: rotate(90deg);
}
</style>
