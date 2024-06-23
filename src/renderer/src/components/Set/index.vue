<template>
  <el-drawer v-model="visible" direction="ltr" title="设置" size="350px">
    <el-form :model="data">
      <el-form-item label="弹幕高度:">
        <el-select v-model="data!.danmuHeight">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="c-ccc fs-14">v{{ version }}</span>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import { ElDrawer, ElForm, ElFormItem, ElSelect, ElOption } from "element-plus";
import { useConfigStore } from "@/stores/useConfigStore";

const { data, version } = storeToRefs(useConfigStore());

//下拉菜单
const options = new Array(100 / 5 + 1).fill(undefined).map((_, index) => {
  return {
    label: `${index * 5}%`,
    value: (index * 5) / 100,
  };
});

const visible = ref(false);

eventEmitter.on("set:show", () => {
  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
