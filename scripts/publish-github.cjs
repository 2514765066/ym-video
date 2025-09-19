const fs = require("fs");
const path = require("path");
const axios = require("axios");
const { name, version } = require("../package.json");

const { GH_TOKEN } = process.env;

const API = "https://api.github.com";

// 仓库名
const REPO = name;

// GitHub 用户名/组织名
const OWNER = "2514765066";

// 获取更新内容
const getDoc = () => {
  const url = path.join(__dirname, "../release-note.md");

  const doc = fs.readFileSync(url).toString();

  const match = doc.match(/##\s*v\d+\.\d+\.\d+\s*[\r\n]+([\s\S]*?)(?=\r\n##)/);

  return match ? match[1] : "";
};

// 创建 Release
const createRelease = async tag_name => {
  const url = `${API}/repos/${OWNER}/${REPO}/releases`;

  const { data } = await axios.post(
    url,
    {
      tag_name,
      name: tag_name,
      body: getDoc(),
      prerelease: false,
      target_commitish: "main",
    },
    {
      headers: {
        Authorization: `token ${GH_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  return data.id;
};

// 上传文件到 Release
const uploadAsset = async (release_id, filePath) => {
  const fileName = path.basename(filePath);
  const stat = fs.statSync(filePath);
  const url = `https://uploads.github.com/repos/${OWNER}/${REPO}/releases/${release_id}/assets?name=${fileName}`;

  await axios.post(url, fs.createReadStream(filePath), {
    headers: {
      Authorization: `token ${GH_TOKEN}`,
      "Content-Type": "application/octet-stream",
      "Content-Length": stat.size,
    },
  });
};

// 主函数
const main = async () => {
  console.log("📦 创建 GitHub Release...");

  const releaseId = await createRelease(version);

  console.log(`✅ Release 创建成功，ID = ${releaseId}`);

  console.log("⬆️ 上传文件...");

  await uploadAsset(
    releaseId,
    path.join(__dirname, `../dist/ym-video-${version}-setup.exe`)
  );

  await uploadAsset(releaseId, path.join(__dirname, "../dist/latest.yml"));

  console.log("✅ 文件上传成功");
};

main();
