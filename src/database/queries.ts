import {
  GuildMemberBilling,
  guildMemberBillingQuery,
  GuildSettings,
  guildSettingsQuery,
} from "../utils/typings/Database.js";
import db from "./index.js";

export const getGuildSettings = db.prepare<guildSettingsQuery, GuildSettings>(
  "SELECT * FROM guildSettings WHERE guildId = $guildId"
);

export const getGuildMemberBilling = db.prepare<
  guildMemberBillingQuery,
  GuildMemberBilling
>(
  "SELECT * FROM guildMemberBilling WHERE guildId = $guildId AND memberId =  $memberId"
);

export const upsertGuildMemberBilling = db.prepare<GuildMemberBilling>(
  `INSERT INTO guildMemberBilling (guildId, billAmount, memberId, unpaidRoleId)
   VALUES ($guildId, $billAmount, $memberId, $unpaidRoleId)
   ON CONFLICT(guildId, memberId)
   DO UPDATE SET
     billAmount = excluded.billAmount,
     unpaidRoleId = excluded.unpaidRoleId`
);

export const upsertGuildSettings = db.prepare<GuildSettings>(
  `INSERT INTO guildSettings (guildId, oxaMerchantApiKey)
   VALUES ($guildId, $oxaMerchantApiKey)
   ON CONFLICT(guildId)
   DO UPDATE SET
     oxaMerchantApiKey = excluded.oxaMerchantApiKey`
);
