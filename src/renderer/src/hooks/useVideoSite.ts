import { WebView } from "@type";

import initCSSRaw from "@/assets/videoSite/index.css?raw";

export const useVideoSite = () => {
  //导入css
  const initCss = () => {
    const webview = document.querySelector("#videoSite") as WebView;

    webview.insertCSS(initCSSRaw);
  };

  return {
    initCss,
  };
};
