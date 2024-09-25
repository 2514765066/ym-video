import { History } from "@/hooks/useHistory";

export const useVideoSiteStore = defineStore("videoSite", () => {
  const data = ref([
    {
      name: "优酷视频",
      url: "https://youku.com/",
      history: new History("https://youku.com/"),
    },
    {
      name: "爱奇艺",
      url: "https://www.iqiyi.com/",
      history: new History("https://www.iqiyi.com/"),
    },
    {
      name: "腾讯视频",
      url: "https://v.qq.com/",
      history: new History("https://v.qq.com/"),
    },
    {
      name: "哔哩哔哩",
      url: "https://www.bilibili.com/",
      history: new History("https://www.bilibili.com/"),
    },
    {
      name: "芒果tv",
      url: "https://www.mgtv.com/",
      history: new History("https://www.mgtv.com/"),
    },
    {
      name: "乐视视频",
      url: "https://www.le.com/",
      history: new History("https://www.le.com/"),
    },
    {
      name: "暴风影音",
      url: "http://www.baofeng.com/",
      history: new History("http://www.baofeng.com/"),
    },
    {
      name: "搜狐视频",
      url: "https://tv.sohu.com/",
      history: new History("https://tv.sohu.com/"),
    },
    {
      name: "AcFun",
      url: "https://www.acfun.cn/",
      history: new History("https://www.acfun.cn/"),
    },
    {
      name: "PP视频",
      url: "https://www.pptv.com/",
      history: new History("https://www.pptv.com/"),
    },
    {
      name: "1905",
      url: "http://promotion.m1905.com/",
      history: new History("http://promotion.m1905.com/"),
    },
    {
      name: "华数tv",
      url: "https://www.wasu.cn/",
      history: new History("https://www.wasu.cn/"),
    },
    {
      name: "时光网",
      url: "http://www.mtime.com/",
      history: new History("http://www.mtime.com/"),
    },
    {
      name: "天天看看",
      url: "http://kankan.com/",
      history: new History("http://kankan.com/"),
    },
  ]);

  const selectIndex = ref(0);

  const selectedVideoSite = computed(() => {
    return (
      data.value[selectIndex.value] || {
        name: "",
        url: "about:blank",
      }
    );
  });

  return {
    data,
    selectIndex,
    selectedVideoSite,
  };
});
