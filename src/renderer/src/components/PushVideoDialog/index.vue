<template>
  <ElDialog
    v-model="visible"
    title="添加视频"
    width="600"
    :destroy-on-close="true"
  >
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <ElInput
        spellcheck="false"
        v-model="form.name"
        placeholder="视频名称，不填会自动获取，爱奇艺无法获取正确的名称"
      />

      <ElInput
        spellcheck="false"
        ref="inputRef"
        v-model="form.url"
        placeholder="请输入播放网址，如爱奇艺，腾讯视频等..."
      >
        <template #prepend>
          <el-select v-model="select" placeholder="选择" style="width: 100px">
            <el-option label="虾米解析" value="https://jx.xmflv.cc/?url=" />
          </el-select>
        </template>
      </ElInput>

      <el-button native-type="submit" class="ml-auto">添加</el-button>
    </form>
  </ElDialog>
</template>

<script setup lang="ts">
import eventEmitter from "@/hooks/eventEmitter";
import { ElDialog, ElInput, ElButton, ElSelect, ElOption } from "element-plus";
import { useVideoStore } from "@/stores/useVideoStore";
import { useLoading } from "@/utils/loading";

const getTitle = useLoading(async () => {
  return await ipcRenderer.invoke("getTitle", form.value.url);
});

const { add, has } = useVideoStore();
const inputRef = ref<InstanceType<typeof ElInput>>();

const visible = ref(false);

const form = ref({
  name: "",
  url: "",
});

const select = ref("https://jx.xmflv.cc/?url=");

const close = () => {
  visible.value = false;
};

const handleSubmit = async () => {
  if (!form.value.url.trim()) {
    eventEmitter.emit("error:show", "请输入网址");
    return;
  }

  try {
    form.value.name = await getTitle();
  } catch {
    eventEmitter.emit("error:show", "请输入一个正确的网址");
  }

  if (has(form.value.name)) {
    eventEmitter.emit("error:show", "添加的名称已存在");
    return;
  }

  const url = select.value + form.value.url.trim();

  add({
    name: form.value.name.trim(),
    url: [url],
  });

  form.value = {
    name: "",
    url: "",
  };

  close();

  eventEmitter.emit("success:show", "添加成功");
};

eventEmitter.on("add:show", async () => {
  visible.value = true;

  await nextTick();
  await nextTick();

  inputRef.value?.focus();
});
</script>

<style lang="scss">
.el-dialog {
  --el-dialog-border-radius: 10px !important;
}

.el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
