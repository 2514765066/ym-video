import Database from "better-sqlite3";
import { resources } from "@/utils/path";
import { join } from "path";
import { getVersion, minVersion } from "@/utils/version";

const dbPath = join(resources, `db.sqlite`);

const db = new Database(dbPath);

// 如果表不存在就创建
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS info (
    name TEXT PRIMARY KEY,
    version INTEGER,
    data TEXT
  )
  `
).run();

//查询
export const select = (): string[] => {
  const select = db.prepare("select * from info where version >= ?");

  const rows = select.all(minVersion);

  //@ts-ignore
  return rows.map(r => r.data);
};

//插入
export const insert = (name: string, data: string) => {
  const insert = db.prepare(
    "insert into info (name, version,data) values (?, ?, ?)"
  );

  insert.run(name, getVersion(), data);
};

//修改
export const update = (name: string, data: string) => {
  const update = db.prepare(`update info set data = ? where name = ?`);

  update.run(data, name);
};

//删除
export const remove = (name: string) => {
  const remove = db.prepare(`delete from info where name = ?`);

  remove.run(name);
};
