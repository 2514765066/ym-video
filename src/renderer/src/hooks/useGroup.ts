export const group = (data: string[], callback: (item: string) => any) => {
  if (data.length === 0) {
    return {};
  }

  const res: Record<string, string[]> = {};

  for (const item of data) {
    const basis = callback(item);

    if (!res[basis]) {
      res[basis] = [];
    }

    res[basis].push(item);
  }

  return res;
};

/**
 * 按照 hostname 分组并找出最长的组
 */
export const getLongestGroupByHostname = (data: string[]) => {
  if (data.length === 0) {
    return [];
  }

  const obj = group(data, item => new URL(item).hostname);

  let max = 0;
  let res: string[] = [];

  for (const hostname of Object.keys(obj)) {
    if (obj[hostname].length > max) {
      max = obj[hostname].length;
      res = obj[hostname];
    }
  }

  return res;
};
