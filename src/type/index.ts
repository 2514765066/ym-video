import { WebviewTag } from "electron";

//ipc事件配置
export type IpcEvent = {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  "is:maximize": () => void;
  readConfig: (name: string) => any;
  writeConfig: (name: string, data: any) => void;
  checkForUpdates: () => string;

  search: (keyword: string) => MovieInfo[];

  getImg: (url: string) => string;

  getRecommend: (option: { type: "tv" | "movie"; start?: number }) => MovieInfo;

  getUrl: (name: string) => string[];
};

//ipc事件名称类型
export type IpcEventNames = keyof IpcEvent;

//ipc事件函数的参数类型
export type IpcEventParameters<T extends IpcEventNames> = Parameters<
  IpcEvent[T]
>;

//ipc事件函数的返回值类型
export type IpcEventReturn<T extends IpcEventNames> = ReturnType<IpcEvent[T]>;

export type WebView = WebviewTag;

//视频信息
export type VideoInfo = {
  name: string;
  id: string;
  url: string[];
  history: number;
  minVersion: string;
  pic: string;
};

//电影信息
export type MovieInfo = {
  name: string;
  id: string;
  url?: string[];
  pic: string;
};

//配置信息
export type Config = {
  historyCount: number;
};
