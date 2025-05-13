<template>
  <ElDialog
    v-model="visible"
    title="添加视频"
    width="600"
    :destroy-on-close="true"
  >
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-4">
      <Text
        v-model="form.name"
        placeholder="视频名称，不填会自动获取，爱奇艺无法获取正确的名称"
      />

      <Text
        v-model="form.url"
        placeholder="请输入播放网址，如爱奇艺，腾讯视频等..."
        required
      />

      <el-button
        color="#2383E2"
        :dark="true"
        native-type="submit"
        class="ml-auto"
      >
        添加
      </el-button>
    </form>
  </ElDialog>
</template>

<script setup lang="ts">
import Text from "@/components/Text.vue";
import eventEmitter from "@/hooks/eventEmitter";
import { ElDialog, ElButton } from "element-plus";
import { useVideoStore } from "@/stores/useVideoStore";
import { useLoading } from "@/utils/loading";

const getTitle = useLoading(async () => {
  return await ipcRenderer.invoke("getTitle", form.value.url);
});

const { add, has } = useVideoStore();

const visible = ref(false);

const form = ref({
  name: "",
  url: "",
});

const select = "https://jx.xmflv.cc/?url=";

const close = () => {
  visible.value = false;
};

const handleSubmit = async () => {
  try {
    const name = await getTitle();

    if (!form.value.name) {
      form.value.name = name;
    }
  } catch {
    eventEmitter.emit("error:show", "请输入一个正确的网址");
  }

  if (has(form.value.name)) {
    eventEmitter.emit("error:show", "添加的名称已存在");
    return;
  }

  const url = select + form.value.url.trim();

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
});
</script>

<style lang="scss">
.el-overlay {
  background-color: rgba(15, 15, 15, 0.8);
}

.el-dialog {
  --el-dialog-bg-color: #191919 !important;
  --el-dialog-border-radius: 10px !important;
  box-shadow: rgba(0, 0, 0, 0.48) 0px 24px 48px -8px,
    rgba(0, 0, 0, 0.24) 0px 4px 12px -1px,
    rgba(255, 255, 255, 0.094) 0px 0px 0px 1px !important;
}

.el-input-group__prepend {
  background-color: var(--el-fill-color-blank);
}
</style>
