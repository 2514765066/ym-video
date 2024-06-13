<template>
  <el-dialog v-model="visible" :title="currentLabel" draggable width="600">
    <component
      :is="currentComponent"
      @close="visible = false"
      v-if="visible"
    ></component>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElDialog } from "element-plus";
import eventEmitter from "@/hooks/eventEmitter";
import Edit from "./Edit.vue";
import Push from "./Push.vue";

type Components = Record<
  string,
  {
    component: typeof Edit | typeof Push;
    label: string;
  }
>;

const components: Components = {
  edit: {
    component: Edit,
    label: "编辑",
  },
  push: {
    component: Push,
    label: "添加",
  },
};

//当前类型
const currentType = ref("");

//当前label
const currentLabel = computed(() => {
  return components[currentType.value]?.label || "";
});

//当前组件
const currentComponent = computed(() => {
  return components[currentType.value]?.component || null;
});

const visible = ref(false);

eventEmitter.on("dialog:show", type => {
  currentType.value = type;
  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
