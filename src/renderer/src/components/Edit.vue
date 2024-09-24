<template>
  <el-drawer
    v-model="visible"
    direction="ltr"
    title="编辑"
    size="350px"
    @close="handleClose"
  >
    <section class="h">
      <p class="fs-13 mb-1 c-ccc">跳过片头的时间</p>

      <div class="v g-2 mb-1r">
        <el-time-picker
          style="width: 100%"
          v-model="form!.jumpStart"
          placeholder="跳过片头的时间"
          :editable="false"
          value-format="HH:mm:ss"
          :clearable="false"
        />

        <el-button @click="handleSetStartTime">记录当前时间点</el-button>
      </div>

      <p class="fs-13 mb-1 c-ccc">跳过片尾的时间</p>

      <div class="v g-2">
        <el-time-picker
          style="width: 100%"
          v-model="form!.jumpEnd"
          placeholder="跳过片尾的时间"
          :editable="false"
          value-format="HH:mm:ss"
          :clearable="false"
        />

        <el-button @click="handleSetEndTime">记录当前时间点</el-button>
      </div>
    </section>
  </el-drawer>
</template>

<script setup lang="ts">
import { ElButton, ElTimePicker, ElDrawer } from "element-plus";
import { useVideoStore } from "@/stores/useVideoStore";
import eventEmitter from "@/hooks/eventEmitter";
import { useVideo } from "@/hooks/useVideo";
import { secondsToTimeString } from "@/hooks/useTime";
import { ListItem } from "@type";

const { jumedJS, getCurrentTime } = useVideo();
const { selectedVideo } = storeToRefs(useVideoStore());
const { update } = useVideoStore();

//显示隐藏
const visible = ref(false);

//form数据
const form = ref<ListItem>();

//记录当前时间到跳过开始时间
const handleSetStartTime = async () => {
  const res = await getCurrentTime();
  form.value!.jumpStart = secondsToTimeString(res.currentTime);
};

//记录当前时间到跳过结束时间
const handleSetEndTime = async () => {
  const res = await getCurrentTime();
  form.value!.jumpEnd = secondsToTimeString(res.duration - res.currentTime);
};

//表单验证
const handleClose = () => {
  update(form.value!, () => {
    jumedJS();
    eventEmitter.emit("success:show", "保存成功");
  });
};

eventEmitter.on("edit:show", () => {
  form.value = { ...selectedVideo.value! };

  visible.value = true;
});
</script>

<style scoped lang="scss"></style>
