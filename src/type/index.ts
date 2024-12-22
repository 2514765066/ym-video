import { WebviewTag } from "electron";

const eventNames = [
  "minimize",
  "close",
  "maximize",
  "is:maximize",
  "denyNewWindow",

  "readConfig",
  "writeConfig",

  "openURL",

  "checkForUpdates",

  "search",
  "getImg",
  "getMovie",
  "getUrl",
  "getTitle",
] as const;

export type EventNames = (typeof eventNames)[number];

export type WebView = WebviewTag;

//视频信息
export type VideoInfo = {
  name: string;
  year: string;
  img: string;
  id: string;
  url: string[];
  history: string;
  minVersion: string;
};

//电影信息
export type MovieInfo = {
  name: string;
  year: string;
  img: string;
  id: string;
};

//配置信息
export type Config = {
  historyCount: number;
  cookie: string;
};
