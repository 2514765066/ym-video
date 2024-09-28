import { ElNotification, NotificationHandle } from "element-plus";
import ProgressNotice from "@/components/ProgressNotice.vue";
import UpdateNotice from "@/components/UpdateNotice.vue";

export const useUpdate = () => {
  const ElNotificationElement = ref<NotificationHandle>();
  const isShow = ref(false);

  electron.ipcRenderer.on("update-available", () => {
    ElNotification({
      title: "发现新版本",
      type: "warning",
      position: "bottom-right",
      message: h(UpdateNotice),
      duration: 0,
    });
  });

  electron.ipcRenderer.on("download-progress", () => {
    if (!isShow.value) {
      ElNotificationElement.value = ElNotification({
        title: "下载进度",
        position: "bottom-right",
        dangerouslyUseHTMLString: true,
        message: h(ProgressNotice),
        duration: 0,
      });

      isShow.value = true;
    }
  });

  electron.ipcRenderer.on("update-error", () => {
    ElNotificationElement.value?.close();

    ElNotification({
      title: "错误",
      type: "error",
      position: "bottom-right",
      message: "请检查网络连接",
      duration: 5000,
    });
  });
};
