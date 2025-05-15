//ipc事件配置
export type IpcEvent = {
  //有更新版本
  updateAvailable: (version: string) => void;

  //更新进度
  downloadProgress: (percent: number) => void;

  readConfig: () => string;
  writeConfig: (data: string) => void;

  getImg: (url: string) => string;
  getTitle: (url: string) => string;

  getRecommend: (option: {
    type: "tv" | "movie";
    start?: number;
  }) => MovieInfo[];

  exportConfig: (data: string) => boolean;
  importConfig: () => string;
};

//视频信息
export type VideoInfo = {
  name: string;
  history: number;
  url: string[];
  minVersion: string;
  currentTime: number;
  pic: string;
};

//搜索信息
export type SearchInfo = {
  name: string;
  url: string[];
  pic: string;
};

//电影信息
export type MovieInfo = {
  name: string;
  pic: string;
  sub?: string;
};
