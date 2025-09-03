import { ipcMain } from "./ipcMain";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { resources } from "./path";
import { fetchWithRetry } from "./tools";
// import { openConfig, openDir } from "@/utils/openDialog";

//读取配置
ipcMain.handle("readConfig", async () => {
  const path = join(resources, "db.json");

  try {
    const res = await readFile(path);

    return res.toString();
  } catch {
    return "";
  }
});

//写入配置
ipcMain.on("writeConfig", async (_, data) => {
  const path = join(resources, `db.json`);

  console.log(path);

  await writeFile(path, data);
});

//获取图片
ipcMain.handle("getImg", async (_, url) => {
  const response = await fetchWithRetry(url);

  const data = await response.arrayBuffer();

  return `data:image/jpeg;base64,${Buffer.from(data).toString("base64")}`;
});

//获取标题
ipcMain.handle("getTitle", async (_, url) => {
  const response = await fetch(url);

  const html = await response.text();

  return html.match(/<title>(.*?)<\/title>/)![1];
});

//获取热门电影
ipcMain.handle("getRecommend", async (_, option) => {
  const { type, start = 0 } = option;

  const url = `https://m.douban.com/rexxar/api/v2/${type}/recommend?refresh=0&start=${start}&count=20&uncollect=false&sort=U`;

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
