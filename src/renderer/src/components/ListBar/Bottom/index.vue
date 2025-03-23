<template>
  <footer class="w-full mt-auto flex justify-end">
    <Tooltip content="版本，更新和更多...">
      <button
        class="rounded-md flex items-center justify-center w-7 h-7"
        ref="btnRef"
        @click="handleClick"
      >
        <Icon name="question" size="20" color="#989898"></Icon>
      </button>
    </Tooltip>
  </footer>
</template>

<script setup lang="ts">
import Tooltip from "@/lib/ToolTip/index.vue";
import { useAppStore } from "@/stores/useAppStore";
import eventEmitter from "@/hooks/eventEmitter";

const { version } = useAppStore();
const router = useRouter();

const btnRef = ref<HTMLElement>();

//点击帮助
const handleClick = () => {
  if (!btnRef.value) {
    return;
  }

  const rect = btnRef.value?.getBoundingClientRect();

  eventEmitter.emit("menu:show", {
    width: 220,
    x: rect.x + rect.width - 220,
    y: rect.y - rect.height - 32 * 5,
    data: [
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
          {
            title: "反馈问题",
            icon: "bug",
            onSelect() {
              api.openUrl("https://github.com/2514765066/ym-video/issues");
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
footer {
  > button {
    transition: 0.1s;

    &:hover {
      background-color: #2c2c2c;
    }
  }
}
</style>
