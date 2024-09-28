import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import { EventNames } from "../type";

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

  // //获取db
  // async readConfig(name: string) {
  //   return await readJson(name);
  // },

  // //写入db
  // async writeConfig(name: string, data: any) {
  //   await writeJson(name, data);
  // },
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
