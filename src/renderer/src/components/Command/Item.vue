<template>
  <li class="click v-n-c px-1r g-1" @click="handleClick(data.onClick)">
    <span class="c-ccc">{{ data.name }}</span>
    <span class="c-999 fs-12 ellipsis">{{ data.url }}</span>

    <el-tooltip content="编辑" placement="bottom">
      <button
        class="ml f-s-0"
        @click.stop="handleEdit(data.id)"
        v-show="data.edit != false"
      >
        <img src="@/assets/edit.svg" />
      </button>
    </el-tooltip>

    <el-tooltip content="删除" placement="bottom">
      <button
        class="f-s-0"
        @click.stop="handleRemove(data.id)"
        v-show="data.edit != false"
      >
        <img src="@/assets/remove.svg" />
      </button>
    </el-tooltip>
  </li>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { CommandItem } from "@type";
import { useListStore } from "@/stores/useListStore";
import { useConfigStore } from "@/stores/useConfigStore";
import eventEmitter from "@/hooks/eventEmitter";

const props = defineProps<{
  data: CommandItem;
}>();

const emit = defineEmits(["close"]);

const list = useListStore();
const config = useConfigStore();

//点击
function handleClick(func: Function | undefined) {
  if (!func) return;

  func();
  config.data.history = props.data.id;

  emit("close");
}

//编辑
function handleEdit(id: string) {
  list.editID = id;
  eventEmitter.emit("edit:show");
  emit("close");
}

//移除
function handleRemove(id: string) {
  list.remove(id);
  eventEmitter.emit("success:show", "移除成功");
}
</script>

<style scoped lang="scss">
li {
  border-radius: 0.25rem;
  transition: 0.15s;
  min-height: 28px;

  &:hover {
    background-color: #2a2d2e;

    > button {
      display: flex;
    }
  }

  > button {
    display: none;
    $size: 24px;
    width: $size;
    height: $size;
    border-radius: 5px;
    transition: 0.15s;

    &:hover {
      background-color: #393c3d;
    }

    > img {
      $size: 14px;
      width: $size;
      height: $size;
    }
  }
}
</style>
