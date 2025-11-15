import { extendedAPICommand } from "../utils/typings/types.js";
import { generateOxaInvoice } from "../utils/oxaAPI.js";
import { generateOxaInvoiceEmbed } from "../utils/oxaEmbed.js";
import { getGuildMemberBilling } from "../database/queries.js";

export default {
  name: "pay_my_bill",
  description: "Generate a payment invoice via OxaPay",

  execute: async (interaction) => {
    const memberSettings = getGuildMemberBilling.get({
      guildId: interaction.guild.id,
      memberId: interaction.member.id,
    });

    if (!memberSettings)
      throw new Error("Please ask admins to setup your bill settings!");

    const payload = {
      amount: memberSettings.billAmount,
      order_id: `${interaction.channel?.id}-${interaction.user.id}`,

      currency: "GPB",
      sandbox: process.env.NODE_ENV === "development",
    };

    const res = await generateOxaInvoice(payload);

    const embed = generateOxaInvoiceEmbed(interaction.guild, res);

    return embed;
  },
} satisfies extendedAPICommand;
