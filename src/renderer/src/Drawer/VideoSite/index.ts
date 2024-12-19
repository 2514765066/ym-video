import { WebView } from "@type";

export const webviewRef = ref<WebView>();

//打开地址
export const src = ref("");

//刷新
export const reload = () => {
  webviewRef.value?.reload();
};
