import { ElectronAPI } from "@electron-toolkit/preload";
import { IpcEventNames } from "../type";
import { Api } from "./index";

declare global {
  const __APP_VERSION__: string;
  const electron: ElectronAPI<IpcEventNames>;
  const api: Api;
}
