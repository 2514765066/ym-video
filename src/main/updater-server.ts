import express from "express";

const app = express();

export const PORT = 4321;

export const ADDRESS = `http://localhost:${PORT}`;

type Assets = {
  browser_download_url: string;
  name: string;
};

//读取文件
app.get("/:filename", async (req, res) => {
  try {
    const url = `https://gitee.com/api/v5/repos/yxingyus/ym-video/releases/latest`;

    const response = await fetch(url);

    const latest = await response.json();

    const assets: Assets[] = latest.assets;

    console.log(assets, req.params.filename);

    const asset = assets.find(item => item.name == req.params.filename)!;

    res.redirect(asset.browser_download_url);
  } catch (e) {
    console.log(e);
  }
});

app.listen(PORT, () => {
  console.log(`更新服务器已启动: ${ADDRESS}`);
});
