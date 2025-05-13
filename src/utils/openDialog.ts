import { dialog } from "electron";
import { browserWindows } from "@/api/windows";

//打开文件夹
export const openDir = async (title: string) => {
  const win = browserWindows.get("manage")!;

  const res = await dialog.showOpenDialog(win, {
    title,
    properties: ["openDirectory"],
  });

  if (res.canceled) {
    return [];
  }

  return res.filePaths;
};

//打开文件
export const openConfig = async (title: string) => {
  const win = browserWindows.get("manage")!;

  const res = await dialog.showOpenDialog(win, {
    title,
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "播放记录", extensions: ["yv"] }],
  });

  if (res.canceled) {
    return [];
  }

  return res.filePaths;
};
