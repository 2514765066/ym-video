import { writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";

export const writeJson = async (path: string, data: any) => {
  await writeFile(path, JSON.stringify(data, null, 2));
};

export const readJson = async (path: string) => {
  if (!existsSync(path)) {
    return null;
  }

  const res = await readFile(path);

  return JSON.parse(res.toString());
};
