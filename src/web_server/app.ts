import crypto from "node:crypto";
import express, { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import { OxaInvoiceStatusResponseData } from "../utils/typings/OxapayTypes.js";
import { generateOxaInvoiceStatusEmbed } from "../utils/oxaEmbed.js";
import client from "../client.js";
import { sendLogInChannel } from "../utils/logs.js";
import { customRequest } from "../utils/typings/types.js";
import {
  getGuildMemberBilling,
  getGuildSettings,
} from "../database/queries.js";
import { TextChannel } from "discord.js";

const app = express();

const { NODE_ENV } = process.env;

if (NODE_ENV === "development") app.use(morgan("dev"));

app.use(
  express.json({
    verify: (req: customRequest, res, buf) => {
      req.rawBody = buf;
    },
  })
);

app.post("/oxapay/callback", handleOxaPaySigning, handleWebhookEvent);

// Handle undefined routes
app.use((req: Request, res: Response) => {
  res.json({ status: "Working :p" });
});

async function handleOxaPaySigning(
  req: Request<{}, {}, OxaInvoiceStatusResponseData>,
  res: Response,
  next: NextFunction
) {
  let apiKey: string = process.env.OXAPAY_MERCHANT_API_KEY;

  const requestHMAC = req.headers["hmac"];
  const ourHMAC = crypto.createHmac("sha512", apiKey);

  ourHMAC.update((req as customRequest).rawBody);

  const digest = ourHMAC.digest("hex");

  if (digest !== requestHMAC)
    return res.status(403).json({ status: "Unauthorized" });

  next();
}

async function handleWebhookEvent(
  req: Request<{}, {}, OxaInvoiceStatusResponseData>,
  res: Response
) {
  console.log(req.body);
  if (req.body.type !== "invoice" && req.body.status !== "Paid") return;

  const [channelId, userId] = req.body.order_id.split("-");

  const channel = client.channels.cache.get(channelId);

  if (!channel) return console.log("Webhook but channel not found");

  const { guild } = channel as TextChannel;
  if (!guild) return;

  const member = await guild.members.fetch(userId);

  const memberSettings = getGuildMemberBilling.get({
    guildId: guild.id,
    memberId: member.id,
  });

  if (!memberSettings) return console.log(`Webhook but no settibgs found`);

  await member.roles.remove(memberSettings.unpaidRoleId);

  const embed = generateOxaInvoiceStatusEmbed(guild, req.body, true);

  await sendLogInChannel({ embeds: [embed] }, channelId);

  res.send("Success");
}

export default app;
