import { ipcMain } from "./ipcMain";
import { writeFile, readFile } from "fs/promises";
import { join } from "path";
import { resources } from "./path";
import { fetchWithRetry } from "./tools";

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

  await writeFile(path, data);
});

//获取豆瓣搜索
// ipcMain.handle("getSearch", async (_, keyword) => {
//   const response = await fetch(
//     `https://movie.douban.com/j/subject_suggest?q=${keyword}`
//   );

//   const json = await response.json();

//   return json.map((item: any) => {
//     return {
//       name: item.title,
//       sub: item.sub_title,
//       pic: item.img,
//     };
//   });
// });

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
