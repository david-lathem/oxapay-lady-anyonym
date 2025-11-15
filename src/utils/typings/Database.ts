export type guildMemberBillingQuery = { guildId: string; memberId: string };
export type guildSettingsQuery = { guildId: string };

export type guildRoleIdUpdate = {
  guildId: string;
};

export interface GuildMemberBilling {
  guildId: string;
  memberId: string;
  billAmount: number;
}

export interface GuildSettings {
  guildId: string;
  unpaidRoleId: string;
}
