const eventNames = ["minimize", "close", "maximize", "is:maximize"] as const;

export type EventNames = (typeof eventNames)[number];

export interface ListItem {
  name: string;
  url: string;
  jumpStart: string;
  jumpEnd: string;
  onClick?: Function;
}

export type List = ListItem[];
