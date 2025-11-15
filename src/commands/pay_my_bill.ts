import { extendedAPICommand } from "../utils/typings/types.js";
import { generateOxaInvoice } from "../utils/oxaAPI.js";
import { generateOxaInvoiceEmbed } from "../utils/oxaEmbed.js";
import { getGuildSettings } from "../database/queries.js";

export default {
  name: "pay_my_bill",
  description: "Generate a payment invoice via OxaPay",

  execute: async (interaction) => {
    const guildSettings = getGuildSettings.all({
      guildId: interaction.guild.id,
    });

    if (!guildSettings.length)
      throw new Error("Please ask admins to setup the payment details!");

    const settings = guildSettings.find((s) =>
      interaction.member.roles.cache.has(s.unpaidRoleId)
    );

    if (!settings)
      throw new Error(
        "Please ask admins to setup the payment details for role you  have!"
      );

    if (!settings)
      throw new Error("Please ask admins to setup the payment details!");

    const payload = {
      amount: settings.billAmount,
      order_id: `${interaction.channel?.id}-${interaction.user.id}`,

      sandbox: process.env.NODE_ENV === "development",
    };

    const res = await generateOxaInvoice(payload);

    const embed = generateOxaInvoiceEmbed(interaction.guild, res);

    return embed;
  },
} satisfies extendedAPICommand;
