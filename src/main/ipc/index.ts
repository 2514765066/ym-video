import { ipcMain } from "./ipcMain";
import { select, insert, update, remove } from "@/sql";
import { fetchWithRetry } from "@/utils/fetch";

//查询
ipcMain.handle("select", () => {
  return select();
});

//修改
ipcMain.on("update", (_, name, data) => {
  update(name, data);
});

//插入
ipcMain.on("insert", (_, name, data) => {
  insert(name, data);
});

//删除
ipcMain.on("remove", (_, name) => {
  remove(name);
});

//获取图片
ipcMain.handle("getImg", async (_, url) => {
  try {
    const response = await fetchWithRetry(url);

    const data = await response.arrayBuffer();

    return `data:image/jpeg;base64,${Buffer.from(data).toString("base64")}`;
  } catch {
    return "";
  }
});

//获取资源
ipcMain.handle("getRecommend", async (_, { type, start }) => {
  const option = {
    start: String(start || 0),
    count: "20",
    playable: "true",
    sort: "U",
    // tags: "喜剧",
  };

  const query = new URLSearchParams(option).toString();

  const url = `https://m.douban.com/rexxar/api/v2/${type}/recommend?${query}`;

  const response = await fetch(url, {
    referrer: "https://movie.douban.com/explore",
  });

  const data = await response.json();

  return data.items.map((item: any) => {
    return {
      name: item.title,
      pic: item.pic.normal,
      sub: item.card_subtitle,
    };
  });
});
