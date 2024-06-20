import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { EventNames } from "../type";
import { config, db, videoCss, videoJs } from "../hooks/usePath";
import { writeFile, readFile } from "fs/promises";

const api = {
  //最小化
  minimize() {
    // @ts-ignore
    ipcRenderer.send<EventNames>("minimize");
  },

  //最大化还原
  maximize() {
    // @ts-ignore
    ipcRenderer.send<EventNames>("maximize");
  },

  //关闭
  close() {
    // @ts-ignore
    ipcRenderer.send<EventNames>("close");
  },

  //获取db
  async getDb() {
    const res = await readFile(db);
    return JSON.parse(res.toString());
  },

  //写入db
  async updateDb(data: Array<any>) {
    await writeFile(db, JSON.stringify(data, null, 2));
  },

  //获取config
  async getConfig() {
    const res = await readFile(config);
    return JSON.parse(res.toString());
  },

  //写入config
  async updateConfig(data: Array<any>) {
    await writeFile(config, JSON.stringify(data, null, 2));
  },

  //获取video的css样式
  async getVideoCss() {
    const res = await readFile(videoCss);
    return res.toString();
  },

  //获取video的js
  async getVideoJs() {
    const res = await readFile(videoJs);
    return res.toString();
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
