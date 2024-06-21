import { WebviewTag } from "electron";

const eventNames = ["minimize", "close", "maximize", "is:maximize"] as const;

export type EventNames = (typeof eventNames)[number];

export interface ListItem {
  name: string;
  url: string;
  jumpStart: string;
  jumpEnd: string;
  defaultRate: number;
  onClick?: Function;
  id: string;
}

export type List = ListItem[];

export type Set = Record<"speed" | "forward" | "backward", string>;

export type WebView = WebviewTag;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];

export type RemoveOptional<T> = {
  [K in RequiredKeys<T>]: T[K];
};
