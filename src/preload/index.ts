import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { EventNames } from "../type";
import { db } from "../hooks/usePath";
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
  async get() {
    const res = await readFile(db);
    return JSON.parse(res.toString());
  },

  //写入
  async update(data: Array<any>) {
    await writeFile(db, JSON.stringify(data, null, 2));
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
