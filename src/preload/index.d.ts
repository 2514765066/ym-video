import { ElectronAPI } from "@electron-toolkit/preload";
import { EventNames } from "../type";
import { Api } from "./index";

declare global {
  const __APP_VERSION__: string;
  const electron: ElectronAPI<EventNames>;
  const api: Api;
}
