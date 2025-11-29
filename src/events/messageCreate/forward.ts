import { Message } from "discord.js";

export default async (message: Message) => {
  try {
    if (!message.inGuild()) return;

    const { channelId, client, content, attachments, embeds } = message;

    console.log("Message receved");

    if (channelId !== process.env.FORWARD_FROM_CHANNEL_ID)
      return console.log("Message not in from");

    const destChannel = client.channels.cache.get(
      process.env.FORWARD_TO_CHANNEL_ID
    );

    if (!destChannel || !destChannel.isSendable())
      return console.log("Message dest not found");

    await destChannel.send({
      content,
      embeds,
      files: [...attachments.values()],
    });
  } catch (error) {
    console.error(error);
  }
};
