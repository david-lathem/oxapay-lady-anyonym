import { PermissionFlagsBits } from "discord.js";
import { extendedAPICommand } from "../utils/typings/types.js";
import { getAllGuildBilling } from "../database/queries.js";

export default {
  name: "get_bills",
  description: "Generate list of each user bill",
  permissionRequired: PermissionFlagsBits.Administrator,

  execute: async (interaction) => {
    await interaction.guild.members.fetch();

    const billings = getAllGuildBilling.all({
      guildId: interaction.guild.id,
    });

    if (!billings.length) throw new Error("No data found!");

    let str = "";

    for (const [i, billing] of billings.entries()) {
      const member = interaction.guild.members.cache.get(billing.memberId);

      str += `${i + 1}. ${
        member?.user.username ?? `Unknown Member ${billing.memberId}`
      } : ${billing.billAmount} GBP\n`;
    }

    await interaction.editReply({
      content: "Attached is a list of users with their billing.",
      files: [{ name: "billing.txt", attachment: Buffer.from(str, "utf-8") }],
    });
  },
} satisfies extendedAPICommand;
