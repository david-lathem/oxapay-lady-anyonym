import path from "node:path";

import Database from "better-sqlite3";

const pathToDatabase = path.join(
  import.meta.dirname,
  "..",
  "..",
  "database.db"
);

const db = new Database(pathToDatabase);

export default db;
