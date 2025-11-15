import db from "./index.js";

db.exec(`
CREATE TABLE IF NOT EXISTS guildMemberBilling (
    guildId TEXT NOT NULL,
    memberId TEXT NOT NULL,
    billAmount REAL NOT NULL,
    UNIQUE (guildId, memberId)
);
`);

db.exec(`
CREATE TABLE IF NOT EXISTS guildSettings (
    guildId TEXT NOT NULL UNIQUE,
    unpaidRoleId TEXT NOT NULL
);
`);
