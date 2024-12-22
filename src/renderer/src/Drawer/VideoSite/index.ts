import { WebView } from "@type";

export const webviewRef = ref<WebView>();

//刷新
export const reload = () => {
  webviewRef.value?.reload();
};
