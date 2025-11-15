export interface GuildSettings {
  guildId: string;
  //   paymentDetails?: string | null;
  billAmount: number;
  unpaidRoleId: string;
}

export type guildSettingsQuery = { guildId: string };

export type guildSettingsUpdate = {
  guildId: string;
  unpaidRoleId: string | null;
  billAmount: number | null;
};

export type guildRoleIdUpdate = {
  guildId: string;
};
