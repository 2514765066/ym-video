<template>
  <el-drawer v-model="visible" direction="ltr" title="编辑" size="350px">
    <el-form
      label-position="top"
      :rules="rules"
      :model="form"
      ref="ruleFormRef"
    >
      <el-form-item label="名称" prop="name">
        <el-input
          placeholder="名称"
          v-model="form.name"
          maxlength="20"
          show-word-limit
        ></el-input>
      </el-form-item>

      <el-form-item label="网址" prop="url">
        <el-input
          placeholder="网站地址"
          type="textarea"
          v-model="form.url"
          autosize
        ></el-input>
      </el-form-item>

      <el-form-item label="默认倍速" prop="defaultRate">
        <el-input-number
          style="width: 100%"
          v-model="form.defaultRate"
          :min="0.5"
          :max="2"
          :step="0.25"
        />
      </el-form-item>

      <el-form-item label="跳过片头的时间" prop="jumpStart">
        <el-time-picker
          style="width: 100%"
          v-model="form.jumpStart"
          placeholder="跳过片头的时间"
          :editable="false"
          value-format="HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="跳过片尾的时间" prop="jumpEnd">
        <el-time-picker
          style="width: 100%"
          v-model="form.jumpEnd"
          placeholder="跳过片尾的时间"
          :editable="false"
          value-format="HH:mm:ss"
        />
      </el-form-item>
    </el-form>

    <template #footer>
      <el-button class="ml" @click="submitForm">确定</el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import {
  ElInput,
  ElButton,
  ElTimePicker,
  ElDrawer,
  ElForm,
  ElFormItem,
  ElInputNumber,
} from "element-plus";
import type { FormRules, FormInstance } from "element-plus";
import { useListStore } from "@/stores/useListStore";
import eventEmitter from "@/hooks/eventEmitter";
import { ListItem, RemoveOptional } from "@type";
import { load } from "@/hooks/useVideo";

const { editVideo } = storeToRefs(useListStore());

//el-form实例
const ruleFormRef = ref<FormInstance>();

//表单验证规则
const rules = reactive<FormRules<RemoveOptional<ListItem>>>({
  name: { required: true, message: "名称不能为空", trigger: "blur" },
  url: { required: true, message: "网址不能为空", trigger: "blur" },
  defaultRate: { required: true, message: "倍速不能为空", trigger: "blur" },
});

//显示隐藏
const visible = ref(false);

//form数据
const form = ref({ ...editVideo.value! });

//表单验证
function submitForm() {
  if (!ruleFormRef.value) return;

  ruleFormRef.value.validate(valid => {
    if (!valid) return;

    editVideo.value = { ...form.value };
    visible.value = false;
    const { importJs } = load();
    importJs();
    eventEmitter.emit("success:show", "保存成功");
  });
}

eventEmitter.on("edit:show", () => {
  visible.value = true;
  form.value = { ...editVideo.value };
});
</script>

<style scoped lang="scss"></style>
