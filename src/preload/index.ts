import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { EventNames } from "../type";
import { config, db } from "../hooks/usePath";
import { readJson, writeJson } from "../hooks/useFs";

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
    const res = await readJson(db);

    if (res == null) {
      return [];
    }

    return JSON.parse(res.toString());
  },

  //写入db
  async updateDb(data: Array<any>) {
    await writeJson(db, data);
  },

  //获取config
  async getConfig() {
    const res = await readJson(config);

    if (res == null) {
      return null;
    }

    return JSON.parse(res.toString());
  },

  //写入config
  async updateConfig(data: any) {
    await writeJson(config, data);
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
