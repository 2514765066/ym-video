//ipc事件配置
export type IpcEvent = {
  minimize: () => void;
  maximize: () => void;
  isMaximize: (res: boolean) => void;
  close: () => void;

  readConfig: () => any;
  writeConfig: (data: string) => void;

  search: (keyword: string) => MovieInfo[];

  getImg: (url: string) => string;

  getRecommend: (option: { type: "tv" | "movie"; start?: number }) => MovieInfo;

  getUrl: (name: string) => string[];

  checkForUpdates: () => string | undefined;

  downloadProgress: (percent: number) => void;
};

//视频信息
export type VideoInfo = {
  name: string;
  history: number;
  url: string[];
  minVersion: string;
  currentTime?: number;
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
