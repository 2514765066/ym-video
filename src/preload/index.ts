import { contextBridge, shell } from "electron";
import { ipcRenderer } from "../api/ipcRenderer";
import { handlePlayUrl } from "../api/tools";

const api = {
  //打开网页
  openUrl(url: string) {
    shell.openExternal(url);
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

    return handlePlayUrl(res.vod_play_url) as string[];
  },

  //搜索
  async search(keyword: string) {
    const url = `https://search.bfzyapi.com/json-api/?dname=baofeng&key=${keyword}&count=50`;

    const response = await fetch(url);

    const json = await response.json();

    const data = json.posts.filter(
      (item: any) => item.type_name != "电影解说" && item.type_name != "预告片"
    );

    const res: {
      name: string;
      url: string[];
      pic: string;
    }[] = data.map(item => {
      return {
        name: item.vod_name,
        url: handlePlayUrl(item.vod_play_url),
        pic: item.vod_pic,
      };
    });

    return res;
  },
};

export type Api = typeof api;

contextBridge.exposeInMainWorld("api", api);
contextBridge.exposeInMainWorld("ipcRenderer", {
  send: ipcRenderer.send,
  on: ipcRenderer.on,
  invoke: ipcRenderer.invoke,
});
