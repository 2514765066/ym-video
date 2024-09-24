<template>
  <li class="v-sb-c g-1" @click="handleClick">
    <div class="h-n-c o-h">
      <span class="c-ccc ellipsis">{{ data.name }}</span>
      <span class="c-999 fs-12 ellipsis">{{ data.url }}</span>
    </div>

    <el-tooltip content="删除" :hide-after="0" placement="right">
      <button @click.stop="handleRemove">
        <img src="@/assets/svg/remove.svg" />
      </button>
    </el-tooltip>
  </li>
</template>

<script setup lang="ts">
import { ElTooltip } from "element-plus";
import { ListItem } from "@type";
import { useVideoStore } from "@/stores/useVideoStore";
import { useConfigStore } from "@/stores/useConfigStore";
import eventEmitter from "@/hooks/eventEmitter";

const props = defineProps<{
  data: ListItem;
}>();

const emit = defineEmits(["close"]);

const { remove } = useVideoStore();
const config = useConfigStore();

//处理点击
const handleClick = () => {
  if (props.data.onClick) {
    props.data.onClick();
  }

  config.data.history = props.data.id;

  emit("close");
};

//处理移除
const handleRemove = () => {
  remove(props.data.id);

  eventEmitter.emit("success:show", "移除成功");
};
</script>

<style scoped lang="scss"></style>
