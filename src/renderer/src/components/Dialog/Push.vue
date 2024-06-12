<template>
  <form @submit.prevent="submit" class="h g-1r">
    <el-input
      placeholder="名称"
      v-model="form.name"
      maxlength="20"
      show-word-limit
    ></el-input>

    <el-input
      placeholder="网站地址"
      type="textarea"
      v-model="form.url"
      autosize
    ></el-input>

    <el-button class="ml" native-type="submit">确定</el-button>
  </form>
</template>

<script setup lang="ts">
import { ElInput, ElButton } from "element-plus";
import { useListStore } from "@/stores/useListStore";
import eventEmitter from "@/hooks/eventEmitter";

const list = useListStore();

const emit = defineEmits(["close"]);

const form = ref({
  name: "",
  url: "",
});

//验证
function submit() {
  if (form.value.name == "" || form.value.url == "") {
    eventEmitter.emit("error:show", "内容不能为空");
    return;
  }

  if (list.data.map(item => item.name).includes(form.value.name)) {
    eventEmitter.emit("error:show", "该名称已存在");
    return;
  }

  list.push(form.value);

  eventEmitter.emit("success:show", "添加成功");

  emit("close");
}
</script>

<style scoped lang="scss"></style>
