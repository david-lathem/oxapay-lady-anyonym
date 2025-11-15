import db from "./index.js";

db.exec(`
CREATE TABLE IF NOT EXISTS guildSettings (
    guildId TEXT NOT NULL,
    billAmount REAL NOT NULL,
    unpaidRoleId TEXT NOT NULL,
    UNIQUE (guildId, unpaidRoleId)
);

`);
