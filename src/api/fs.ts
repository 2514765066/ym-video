import { writeFile, readFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";
import { resources } from "./path";

export const writeJson = async (name: string, data: any) => {
  if (!existsSync(resources)) {
    await mkdir(resources);
  }

  const path = join(resources, `${name}.json`);

  await writeFile(path, JSON.stringify(data, null, 2));
};

export const readJson = async (name: string) => {
  const path = join(resources, `${name}.json`);

  if (!existsSync(path)) {
    return null;
  }

  const res = await readFile(path);

  return JSON.parse(res.toString());
};
