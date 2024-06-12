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

    <el-time-picker
      v-model="form.jumpStart"
      placeholder="跳过片头的时间"
      :editable="false"
      value-format="HH:mm:ss"
    />

    <el-time-picker
      v-model="form.jumpEnd"
      placeholder="跳过片尾的时间"
      :editable="false"
      value-format="HH:mm:ss"
    />

    <el-button class="ml" native-type="submit">确定</el-button>
  </form>
</template>

<script setup lang="ts">
import { ElInput, ElButton, ElTimePicker } from "element-plus";
import { useListStore } from "@/stores/useListStore";
import eventEmitter from "@/hooks/eventEmitter";

const emit = defineEmits(["close"]);

const { editVideo, data, editName } = storeToRefs(useListStore());

const form = ref({ ...editVideo.value! });

function submit() {
  if (form.value.name == "" || form.value.url == "") {
    eventEmitter.emit("error:show", "名称和网站不能为空");
    return;
  }

  if (
    data.value
      .map(item => item.name)
      .filter(item => item != editName.value)
      .includes(form.value.name)
  ) {
    eventEmitter.emit("error:show", "该名称已存在");
    return;
  }

  editVideo.value = { ...form.value };

  eventEmitter.emit("success:show", "保存成功");
  emit("close");
}
</script>

<style scoped lang="scss"></style>
