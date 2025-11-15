import { extendedAPICommand } from "../utils/typings/types.js";
import { fetchOxaInvoiceStatus } from "../utils/oxaAPI.js";
import { generateOxaInvoiceStatusEmbed } from "../utils/oxaEmbed.js";

export default {
  name: "invoice_status",
  description: "Check the status of a payment invoice",

  options: [
    {
      name: "track_id",
      description: "Invoice track ID",
      type: 10, // string
      required: true,
    },
  ],
  execute: async (interaction) => {
    const trackId = interaction.options.getNumber("track_id", true);

    const res = await fetchOxaInvoiceStatus(trackId);

    const embed = generateOxaInvoiceStatusEmbed(interaction.guild, res.data);

    return embed;
  },
} satisfies extendedAPICommand;
