// 网络是否可用
export const isOnline = ref(navigator.onLine);

//处理断网事件
window.addEventListener("offline", () => {
  isOnline.value = false;
});

//处理网络恢复事件
window.addEventListener("online", () => {
  isOnline.value = true;
});
