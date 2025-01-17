//ipc事件配置
export type IpcEvent = {
  minimize: () => void;
  maximize: () => void;
  close: () => void;
  "is:maximize": () => void;
  readConfig: () => any;
  writeConfig: (data: string) => void;

  search: (keyword: string) => MovieInfo[];

  getImg: (url: string) => string;

  getRecommend: (option: { type: "tv" | "movie"; start?: number }) => MovieInfo;

  getUrl: (name: string) => string[];

  checkForUpdates: () => string | undefined;

  downloadProgress: (percent: number) => void;
};

//ipc事件名称类型
export type IpcEventNames = keyof IpcEvent;

//ipc事件函数的参数类型
export type IpcEventParameters<T extends IpcEventNames> = Parameters<
  IpcEvent[T]
>;

//ipc事件函数的返回值类型
export type IpcEventReturn<T extends IpcEventNames> = ReturnType<IpcEvent[T]>;

//视频信息
export type VideoInfo = {
  name: string;
  history: number;
  url: string[];
  minVersion: string;
  pic: string;
};

//电影信息
export type MovieInfo = {
  name: string;
  url?: string[];
  pic: string;
};

//配置信息
export type Config = {
  historyCount: number;
};
