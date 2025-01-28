<template>
  <ElDialog v-model="showable" title="新增功能" width="60%">
    <ElScrollbar :height="400">
      <div v-for="{ name, data } of updatesInfo" :key="name" class="mb-2r">
        <p class="mb-2 fs-18">{{ name }}</p>

        <ol class="h g-2">
          <li v-for="(item, index) of data" :key="index" class="c-ccc fs-16">
            {{ item }}
          </li>
        </ol>
      </div>
    </ElScrollbar>
  </ElDialog>
</template>

<script setup lang="ts">
import Doc from "@/../../../release-note.md?raw";
import eventEmitter from "@/hooks/eventEmitter";
import { ElDialog, ElScrollbar } from "element-plus";

//是否显示
const showable = ref(false);

const updatesInfo = ref<
  {
    name: string;
    data: string[];
  }[]
>([]);

const versionRegex = /## (\S+)\s+([\s\S]*?)(?=## |\n*$)/g;
let match;

while ((match = versionRegex.exec(Doc)) !== null) {
  const version = match[1]; // 版本号
  const content = match[2].trim(); // 版本对应的更新内容

  const updates = content
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0);

  updatesInfo.value.push({
    name: version,
    data: updates,
  });
}

eventEmitter.on("new:show", () => {
  showable.value = true;
});
</script>

<style scoped lang="scss"></style>
