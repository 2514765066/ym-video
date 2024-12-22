import { WebView } from "@type";
import initCSSRaw from "@/assets/video/index.css?raw";
import initJSRaw from "@/assets/video/index.js?raw";

//webview实例
export const webviewRef = ref<WebView>();

//是否打开列表
export const isOpen = ref(true);

//初始化css
export const useCSS = () => {
  webviewRef.value?.insertCSS(initCSSRaw);
};

//初始化js
export const useJS = () => {
  webviewRef.value?.executeJavaScript(initJSRaw);
};

//刷新
export const reload = () => {
  webviewRef.value?.reload();
};
