import { WebviewTag } from "electron";

const eventNames = [
  "minimize",
  "close",
  "maximize",
  "is:maximize",
  "denyNewWindow",
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

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type RemoveOptional<T> = {
  [K in RequiredKeys<T>]: T[K];
};
