//ipc事件配置
export type IpcEvent = {
  //有更新版本
  updateAvailable: (version: string) => void;

  //更新进度
  downloadProgress: (percent: number) => void;

  readConfig: () => string;
  writeConfig: (data: string) => void;

  getSearch: (keyword: string) => {
    name: string;
    sub: string;
    pic: string;
  }[];

  getImg: (url: string) => string;
  getTitle: (url: string) => string;

  getRecommend: (option: {
    type: "tv" | "movie";
    start?: number;
  }) => MovieInfo[];
};

//视频信息
export type VideoInfo = {
  name: string;
  history: number;
  url: string[];
  minVersion: string;
  currentTime: number;
  pic: string;
  duration: number;
};

//搜索信息
export type SearchInfo = {
  name: string;
  url: string[];
  pic: string;
  sub: string;
};

//电影信息
export type MovieInfo = {
  name: string;
  pic: string;
  sub?: string;
};
