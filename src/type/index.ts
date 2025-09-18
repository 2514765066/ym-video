//ipc事件配置
export type IpcEvent = {
  //查询
  select: () => string[];

  //修改
  update: (name: string, data: string) => void;

  //插入
  insert: (name: string, data: string) => void;

  //删除
  remove: (name: string) => void;

  //获取图片
  getImg: (url: string) => string;

  //获取资源
  getRecommend: (option: {
    type: "tv" | "movie";
    start?: number;
  }) => MovieInfo[];
};

//选集
export type Episode = {
  label: string;
  value: number;
  url: string;
  duration: number;
  currentTime: number;
};

//视频信息
export type VideoInfo = {
  name: string;
  history: number;
  url: Episode[];
  pic: string;
  time: number;
};

//搜索信息
export type SearchInfo = {
  name: string;
  url: Episode[];
  pic: string;
  sub?: string;
};

//电影信息
export type MovieInfo = {
  name: string;
  pic: string;
  sub?: string;
};
