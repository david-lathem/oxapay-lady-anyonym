import { extendedAPICommand } from "../utils/typings/types.js";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { generateGuildSettingsEmbed } from "../utils/embeds.js";
import { upsertGuildSettings } from "../database/queries.js";

export default {
  name: "set_settings",
  description: "Set unapaid role for this server",
  permissionRequired: PermissionFlagsBits.Administrator,

  options: [
    {
      name: "unpaid_role",
      description: "Unpaid role",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  execute: async (interaction) => {
    const unpaidRole = interaction.options.getRole("unpaid_role", true);

    upsertGuildSettings.run({
      guildId: interaction.guildId,
      unpaidRoleId: unpaidRole.id,
    });

    return generateGuildSettingsEmbed();
  },
} satisfies extendedAPICommand;
