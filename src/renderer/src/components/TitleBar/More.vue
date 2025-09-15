<template>
  <Menu :data="menu" width="250" placement="bottom">
    <button class="w-6 h-6 ml-auto rounded-md flex-center hover:bg-stone-800">
      <Tip content="更多信息">
        <Icon name="more" color="#ffffffcf" size="18" />
      </Tip>
    </button>
  </Menu>
</template>

<script setup lang="ts">
import Icon from "@/components/Icon.vue";
import { Tip, Menu } from "@/components/Tooltip";

const repoUrl = `https://github.com/2514765066/${__APP_NAME__}`;

const menu = [
  {
    title: "更多信息",
    children: [
      {
        title: "版本更新",
        icon: "download",
        onSelect() {
          api.openUrl(`${repoUrl}/releases`);
        },
      },
      {
        title: "项目地址",
        icon: "github",
        onSelect() {
          api.openUrl(repoUrl);
        },
      },
      {
        title: "反馈问题",
        icon: "bug",
        onSelect() {
          api.openUrl(`${repoUrl}/issues`);
        },
      },
    ],
  },
  {
    children: [
      {
        sub: `当前版本 ${__APP_VERSION__}`,
      },
    ],
  },
];
</script>

<style scoped lang="scss"></style>
