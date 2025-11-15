import { Guild, TextChannel } from "discord.js";

declare global {
  namespace Express {
    interface Request {
      rawBody?: Buffer;
      guild?: Guild;
    }
  }
}
