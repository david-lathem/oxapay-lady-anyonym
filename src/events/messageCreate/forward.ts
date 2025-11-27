import { Message } from "discord.js";

export default async (message: Message) => {
  try {
    if (!message.inGuild()) return;

    const { channelId, client, content, attachments, embeds } = message;

    if (channelId !== process.env.FORWARD_FROM_CHANNEL_ID) return;

    const destChannel = client.channels.cache.get(
      process.env.FORWARD_TO_CHANNEL_ID
    );

    if (!destChannel || !destChannel.isSendable()) return;

    await destChannel.send({
      content,
      embeds,
      files: [...attachments.values()],
    });
  } catch (error) {
    console.error(error);
  }
};
