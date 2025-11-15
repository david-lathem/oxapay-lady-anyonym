import { extendedAPICommand } from "../utils/typings/types.js";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { upsertGuildSettings } from "../database/queries.js";
import { generateGuildSettingsEmbed } from "../utils/embeds.js";

export default {
  name: "set_settings",
  description: "Set Settings",
  // permissionRequired: PermissionFlagsBits.Administrator,

  options: [
    {
      name: "bill_amount",
      description: "bill amount",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "unpaid_role",
      description: "unpaid role",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  execute: async (interaction) => {
    const billAmount = interaction.options.getNumber("bill_amount", true);
    const unpaidRole = interaction.options.getRole("unpaid_role", true);

    upsertGuildSettings.run({
      guildId: interaction.guildId,
      billAmount,
      unpaidRoleId: unpaidRole.id,
    });

    return generateGuildSettingsEmbed();
  },
} satisfies extendedAPICommand;
