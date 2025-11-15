import { EmbedBuilder } from "discord.js";
import { BaseEmbedOptions } from "./typings/types.js";

export function buildBaseEmbed({
  guild,
  title,
  description,
  color = 15856712,
  fields = [],
}: BaseEmbedOptions) {
  return new EmbedBuilder()
    .setTitle(title ?? null)
    .setColor(color)
    .setDescription(description ?? null)
    .addFields(fields)
    .setFooter({
      text: guild.name,
      iconURL: guild.iconURL({ size: 128 }) || undefined,
    })
    .setThumbnail(guild.iconURL());
}

export function generateGuildSettingsEmbed() {
  return new EmbedBuilder().setDescription("Success!");
}
