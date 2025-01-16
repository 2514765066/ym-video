import { contextBridge, shell } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { ipcRenderer } from "../api/ipcRenderer";

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
    return await ipcRenderer.invoke("getUrl", name);
  },

  //搜索
  async search(keyword: string) {
    return await ipcRenderer.invoke("search", keyword);
  },

  //写入
  async write(data: string) {
    await ipcRenderer.invoke("writeConfig", data);
  },

  //读取
  async read() {
    return await ipcRenderer.invoke("readConfig");
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
