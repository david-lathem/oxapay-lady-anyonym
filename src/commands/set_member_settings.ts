import { extendedAPICommand } from "../utils/typings/types.js";
import { ApplicationCommandOptionType, PermissionFlagsBits } from "discord.js";
import { generateGuildSettingsEmbed } from "../utils/embeds.js";
import { upsertGuildMemberBilling } from "../database/queries.js";

export default {
  name: "set_member_settings",
  description: "Set Settings",
  permissionRequired: PermissionFlagsBits.Administrator,

  options: [
    {
      name: "bill_amount",
      description: "bill amount",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },

    {
      name: "member",
      description: "member",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "unpaid_role",
      description: "Unpaid role",
      type: ApplicationCommandOptionType.Role,
      required: true,
    },
  ],
  execute: async (interaction) => {
    const billAmount = interaction.options.getNumber("bill_amount", true);
    const member = interaction.options.getUser("member", true);
    const unpaidRole = interaction.options.getRole("unpaid_role", true);

    upsertGuildMemberBilling.run({
      guildId: interaction.guildId,
      billAmount,
      memberId: member.id,
      unpaidRoleId: unpaidRole.id,
    });

    return generateGuildSettingsEmbed();
  },
} satisfies extendedAPICommand;
