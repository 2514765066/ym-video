<template>
  <el-dialog v-model="visible" title="添加视频" draggable width="600">
    <el-form ref="ruleFormRef" :model="form" :rules="rules">
      <el-form-item prop="name">
        <el-input
          placeholder="名称"
          v-model="form.name"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item prop="url">
        <el-input
          placeholder="网站地址"
          type="textarea"
          v-model="form.url"
          autosize
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="ml" @click="submitForm">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup lang="ts">
import { ElDialog, ElInput, ElButton, ElForm, ElFormItem } from "element-plus";
import eventEmitter from "@/hooks/eventEmitter";
import { useListStore } from "@/stores/useListStore";
import type { FormRules, FormInstance } from "element-plus";
import { ListItem, RemoveOptional } from "@type";

const list = useListStore();

//el-form实例
const ruleFormRef = ref<FormInstance>();

//表单验证规则
const rules = reactive<FormRules<RemoveOptional<ListItem>>>({
  name: { required: true, message: "名称不能为空", trigger: "blur" },
  url: { required: true, message: "网址不能为空", trigger: "blur" },
});

const form = ref();

const visible = ref(false);

//表单验证
const submitForm = () => {
  if (!ruleFormRef.value) return;

  ruleFormRef.value.validate(valid => {
    if (!valid) return;

    //添加
    list.create({ ...form.value });
    useDefault();
    visible.value = false;
    eventEmitter.emit("success:show", "添加成功");
  });
};

//格式化默认值
function useDefault() {
  form.value = {
    name: "",
    url: "",
  };
}

useDefault();

eventEmitter.on("create:show", () => {
  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
