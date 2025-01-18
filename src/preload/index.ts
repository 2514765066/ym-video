import { contextBridge, shell } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { ipcRenderer } from "../api/ipcRenderer";
import { handlePlayUrl } from "../api/tools";

const api = {
  //最小化
  minimize() {
    ipcRenderer.send("minimize");
  },

  //最大化还原
  maximize() {
    ipcRenderer.send("maximize");
  },

  //关闭
  close() {
    ipcRenderer.send("close");
  },

  //打开网页
  openUrl(url: string) {
    shell.openExternal(url);
  },

  //获取图片
  async getImg(url: string) {
    return await ipcRenderer.invoke("getImg", url);
  },

  //获取url
  async getUrl(name: string) {
    const url = `https://search.bfzyapi.com/json-api/?dname=baofeng&key=${name}`;

    const response = await fetch(url);

    const json = await response.json();

    const data: {
      vod_play_url: string;
      vod_id: string;
      vod_name: string;
    }[] = json.posts;

    const res = data.find(item => item.vod_name == name);

    if (!res) {
      return [];
    }

    return handlePlayUrl(res.vod_play_url);
  },

  //搜索
  async search(keyword: string) {
    const url = `https://search.bfzyapi.com/json-api/?dname=baofeng&key=${keyword}&count=50`;

    const response = await fetch(url);

    const json = await response.json();

    const data = json.posts.filter(
      (item: any) => item.type_name != "电影解说" && item.type_name != "预告片"
    );

    return data.map(item => {
      return {
        name: item.vod_name,
        url: handlePlayUrl(item.vod_play_url),
        pic: item.vod_pic,
      };
    });
  },

  //写入
  async write(data: string) {
    await ipcRenderer.invoke("writeConfig", data);
  },

  //读取
  async read() {
    return await ipcRenderer.invoke("readConfig");
  },

  //检查更新
  async checkForUpdates() {
    return await ipcRenderer.invoke("checkForUpdates");
  },
};

export type Api = typeof api;

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", electronAPI);
    contextBridge.exposeInMainWorld("api", api);
  } catch (error) {
    console.error(error);
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI;
  // @ts-ignore (define in dts)
  window.api = api;
}
