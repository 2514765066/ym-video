<template>
  <ElTooltip
    trigger="click"
    effect="light"
    :show-arrow="false"
    :offset="6"
    :hide-after="0"
    popper-class="tooltip-menu "
    :popper-style="{ width: `${width}px` }"
    v-model:visible="visible"
    placement="bottom-start"
    v-bind="$attrs"
  >
    <template #content>
      <ElScrollbar max-height="40vh">
        <Group v-for="(group, index) of data" :key="index" :data="group">
          <Item
            v-for="(item, index) of group.children"
            :key="index"
            :data="item"
            @click="handleClose"
          />
        </Group>
      </ElScrollbar>
    </template>

    <slot></slot>
  </ElTooltip>
</template>

<script setup lang="ts">
import { ElScrollbar } from "element-plus";
import Group from "./components/Group.vue";
import Item from "./components/Item.vue";
import { ElTooltip } from "element-plus";
import { MenuGrounp } from "./type";

withDefaults(
  defineProps<{
    data: MenuGrounp[];
    width?: number | string;
  }>(),
  {
    width: 250,
  }
);

const visible = defineModel({
  default: false,
});

const handleClose = () => {
  visible.value = false;
};
</script>

<style lang="scss">
.tooltip-menu {
  --el-bg-color-overlay: #252525 !important;
  --el-popper-border-radius: 8px !important;

  padding: unset !important;
  border: unset !important;

  box-shadow: rgba(0, 0, 0, 0.2) 0px 14px 28px -6px,
    rgba(0, 0, 0, 0.12) 0px 2px 4px -1px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px;
}
</style>
