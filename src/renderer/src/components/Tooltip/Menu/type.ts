export type MenuGrounp = {
  title?: string;
  hidden?: boolean;
  children: MenuItem[];
};

export type MenuItem = {
  title?: string;
  value?: string | number | symbol;
  icon?: string;
  sub?: string;
  hidden?: boolean;
  hoverColor?: string;
  onSelect?: (data: MenuItem) => void;
};
