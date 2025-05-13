<template>
  <footer class="w-full flex justify-end">
    <Menu :data="menu" placement="top-end" width="220">
      <button class="rounded-md flex items-center justify-center w-7 h-7">
        <Tip content="版本，更新和更多...">
          <Icon name="question" size="20" color="#989898" />
        </Tip>
      </button>
    </Menu>
  </footer>
</template>

<script setup lang="ts">
import { Tip, Menu } from "@/components/Tooltip";
import { repoUrl } from "@/router/base";

const menu = [
  {
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
