import { BaseInteraction } from "discord.js";
import { handleInteractionError } from "../../utils/interaction.js";

export default async (interaction: BaseInteraction) => {
  try {
    if (interaction.isChatInputCommand() && interaction.inCachedGuild()) {
      const command = interaction.client.commands.find(
        (c) => c.name === interaction.commandName
      );

      if (!command?.execute) throw new Error("Command is not setup yet!");

      if (!interaction.inCachedGuild())
        throw new Error("Command must be ran inside server only!");

      // Check for permissions if set any
      if (command.permissionRequired && interaction.inCachedGuild()) {
        // If only specified single perm
        if (typeof command.permissionRequired === "bigint") {
          if (!interaction.member.permissions.has(command.permissionRequired))
            throw new Error("You do not have enough perms to run the command!");
        }

        // If specified array of perms
        if (Array.isArray(command.permissionRequired)) {
          const hasPerm = command.permissionRequired.some((p) =>
            interaction.member.permissions.has(p)
          );

          if (!hasPerm)
            throw new Error("You do not have enough perms to run the command!");
        }
      }

      await interaction.deferReply();
      const embed = await command.execute(interaction);

      // const embedChannel = interaction.guild.channels.cache.get(
      //   process.env.EMBEDS_CHANNEL_ID
      // );

      // if (embedChannel?.isSendable()) {
      // await embedChannel.send({ embeds: [embed] });

      await interaction.editReply({ embeds: [embed] });
      // }
    }

    if (interaction.isAutocomplete()) {
      const command = interaction.client.commands.find(
        (c) => c.name === interaction.commandName
      );

      if (!command?.autocomplete) return;

      let response = await command.autocomplete(interaction);

      response = response.slice(0, 25);

      await interaction.respond(
        response.map((r) => (typeof r === "string" ? { name: r, value: r } : r))
      );
    }
  } catch (error) {
    if (error instanceof Error) handleInteractionError(interaction, error);
  }
};
