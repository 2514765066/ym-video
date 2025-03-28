//ipc事件配置
export type IpcEvent = {
  readConfig: () => string;
  writeConfig: (data: string) => void;

  getImg: (url: string) => string;
  getTitle: (url: string) => string;

  getRecommend: (option: {
    type: "tv" | "movie";
    start?: number;
  }) => MovieInfo[];

  exportConfig: (data: string) => void;
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

//文档信息
export type DocInfo = {
  name: string;
  data: string[];
};
