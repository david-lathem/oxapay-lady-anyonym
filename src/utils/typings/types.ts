import {
  APIEmbedField,
  ApplicationCommandOptionChoiceData,
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  ColorResolvable,
  EmbedBuilder,
  Guild,
  RESTPostAPIChatInputApplicationCommandsJSONBody,
} from "discord.js";

export interface extendedAPICommand
  extends RESTPostAPIChatInputApplicationCommandsJSONBody {
  permissionRequired?: bigint | Array<bigint>;
  guildOnly?: Boolean;
  autocomplete?(
    interaction: AutocompleteInteraction
  ): Promise<Array<ApplicationCommandOptionChoiceData | string>>;
  execute(
    interaction: ChatInputCommandInteraction<"cached">
  ): Promise<EmbedBuilder | void>;
}

// export interface customRequest extends Request {
//   rawBody: Buffer;
//   guild: Guild;
//   channel: TextChannel;
// }

export interface BaseCustomFetchOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any[] | Record<any, any>;
  additionalHeaders?: Record<any, any>;
}

export interface OxaPayFetchOptions extends BaseCustomFetchOptions {
  oxapay: true;
  merchantApiKey: string;
  apiKeyType: "General" | "Merchant" | "Payout";
}

export interface BaseEmbedOptions {
  guild: Guild;
  title?: string;
  description?: string;
  color?: ColorResolvable;
  fields?: APIEmbedField[];
}
