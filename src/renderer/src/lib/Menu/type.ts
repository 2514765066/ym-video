export type MenuProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
  data: MenuGrounp[];
  select?: (title: string) => void;
};

export type MenuGrounp = {
  title?: string;
  children: MenuItem[];
};

export type MenuItem = {
  title?: string;
  icon?: string;
  sub?: string;
  hidden?: boolean;
  onSelect?: () => void;
};

export type MenuOption = {
  data: MenuGrounp[];
  width: number;
  x: number;
  y: number;
};
