import db from "./index.js";

db.exec(`CREATE TABLE IF NOT EXISTS guildSettings(
    guildId TEXT NOT NULL UNIQUE,
    billAmount REAL NOT NULL,
    unpaidRoleId TEXT NOT NULL
)`);
