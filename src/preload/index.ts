import { contextBridge, shell } from "electron";
import { ipcRenderer } from "../main/ipc/ipcRenderer";
import { handlePlayUrl } from "../main/utils/tools";
import { fetchWithTimeout } from "../main/utils/fetch";
import { SearchInfo } from "@type";

const api = {
  //打开网页
  openUrl(url: string) {
    shell.openExternal(url);
  },

  //获取电影信息
  async getFilm(name: string) {
    const url = `https://search.bfzyapi.com/json-api/?dname=baofeng&key=${name}`;

    const response = await fetchWithTimeout(url);

    const json = await response.json();

    type ResData = {
      vod_play_url: string;
      vod_id: string;
      vod_pic: string;
      vod_name: string;
    };

    const data: ResData[] = json.posts;

    const res = data.find(item => item.vod_name == name)!;

    if (!res) {
      return;
    }

    return {
      name,
      pic: res.vod_pic,
      url: handlePlayUrl(res.vod_play_url),
    };
  },

  //搜索
  async searchFilm(keyword: string) {
    const url = `https://search.bfzyapi.com/json-api/?dname=baofeng&key=${keyword}&count=50`;

    const response = await fetch(url);

    const json = await response.json();

    const data = json.posts.filter(
      (item: any) => item.type_name != "电影解说" && item.type_name != "预告片"
    );

    const res: SearchInfo[] = data.map(item => {
      return {
        name: item.vod_name,
        url: handlePlayUrl(item.vod_play_url),
        pic: item.vod_pic,
        sub: item.vod_content,
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
