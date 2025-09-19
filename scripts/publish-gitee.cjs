const fs = require("fs");
const path = require("path");
const formData = require("form-data");
const axios = require("axios");
const { name, version } = require("../package.json");

const { GITEE_TOKEN } = process.env;

const API = "https://gitee.com/api/v5";

// 仓库名
const REPO = name;

// Gitee 用户名/组织名
const OWNER = "yxingyus";

//获取更新内容
const getDoc = () => {
  const url = path.join(__dirname, "../release-note.md");

  const doc = fs.readFileSync(url).toString();

  const match = doc.match(/##\s*v\d+\.\d+\.\d+\s*[\r\n]+([\s\S]*?)(?=\r\n##)/);

  return match ? match[1] : "";
};

// 创建 Release
const createRelease = async tag_name => {
  const url = `${API}/repos/${OWNER}/${REPO}/releases`;

  const form = new formData();

  form.append("access_token", GITEE_TOKEN);
  form.append("tag_name", tag_name);
  form.append("name", tag_name);
  form.append("body", getDoc());
  form.append("prerelease", "false");
  form.append("target_commitish", "main");

  const { data } = await axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
    },
  });

  return data.id;
};

// 上传文件到 Release
const uploadAsset = async (release_id, filePath) => {
  const url = `${API}/repos/${OWNER}/${REPO}/releases/${release_id}/attach_files`;

  const form = new formData();

  form.append("access_token", GITEE_TOKEN);
  form.append("file", fs.createReadStream(filePath), path.basename(filePath));

  await axios.post(url, form, {
    headers: {
      ...form.getHeaders(),
    },
  });
};

//主函数
const main = async () => {
  console.log("📦 创建 Gitee Release...");

  const releaseId = await createRelease(version);

  console.log(`✅ Release 创建成功，ID = ${releaseId}`);

  console.log("⬆️ 上传文件...");

  await uploadAsset(
    releaseId,
    path.join(__dirname, `../dist/ym-video-${version}-setup.exe`)
  );

  await uploadAsset(releaseId, path.join(__dirname, "../dist/latest.yml"));

  console.log("✅ 文件上传成功：");
};

main();
