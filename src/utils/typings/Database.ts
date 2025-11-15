export type guildMemberBillingQuery = { guildId: string; memberId: string };
export type guildSettingsQuery = { guildId: string };

export interface GuildMemberBilling {
  guildId: string;
  memberId: string;
  billAmount: number;
  unpaidRoleId: string;
}

export interface GuildSettings {
  guildId: string;
  oxaMerchantApiKey: string;
}
