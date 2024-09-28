import { WebviewTag } from "electron";

const eventNames = [
  "minimize",
  "close",
  "maximize",
  "is:maximize",
  "denyNewWindow",

  "readConfig",
  "writeConfig",

  "update-available",
  "update-error",
  "download-progress",
  "autoUpdate",
  "manualUpdate",

  "msg",
] as const;

export type EventNames = (typeof eventNames)[number];

export type ListItem = {
  name: string;
  id: string;
  url: string;
  jumpStart: string;
  jumpEnd: string;
  onClick?: Function;
};

export type List = ListItem[];

export type WebView = WebviewTag;

export type ConfigData = {
  history: string;
};
