import {
  GuildSettings,
  guildSettingsQuery,
  guildSettingsUpdate,
} from "../utils/typings/Database.js";
import db from "./index.js";

// [GUILD SETTINGS QUERIES]

// 1: Get guild settings
export const getGuildSettings = db.prepare<guildSettingsQuery, GuildSettings>(
  "SELECT * FROM guildSettings WHERE guildId = $guildId"
);

export const upsertGuildSettings = db.prepare<guildSettingsUpdate>(
  `INSERT INTO guildSettings (guildId, billAmount, unpaidRoleId)
   VALUES ($guildId, $billAmount, $unpaidRoleId)
   ON CONFLICT(guildId)
   DO UPDATE SET
     unpaidRoleId = $unpaidRoleId,
     billAmount = $billAmount`
);
