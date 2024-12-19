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

export type VideoInfo = {
  name: string;
  year: string;
  img: string;
  id: string;
  url: string;
};

export type MovieInfo = {
  name: string;
  year: string;
  img: string;
  id: string;
};
