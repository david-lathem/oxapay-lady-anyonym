import { extendedAPICommand } from "../utils/typings/types.js";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { generateGuildSettingsEmbed } from "../utils/embeds.js";
import { upsertGuildSettings } from "../database/queries.js";

export default {
  name: "set_oxa_api",
  description: "Set api key for ur server",
  permissionRequired: PermissionFlagsBits.Administrator,

  options: [
    {
      name: "oxa_api_key",
      description: "your merchant api key",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  execute: async (interaction) => {
    const oxaMerchantApiKey = interaction.options.getString(
      "oxa_api_key",
      true
    );

    upsertGuildSettings.run({
      guildId: interaction.guildId,
      oxaMerchantApiKey,
    });

    return generateGuildSettingsEmbed();
  },
} satisfies extendedAPICommand;
