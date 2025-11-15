import customFetch from "./customFetch.js";
import {
  OxaBalanceResponse,
  OxaGenerateInvoicePayload,
  OxaGenerateInvoiceResponse,
  OxaInvoiceStatusResponse,
  OxaPayoutPayload,
  OxaPayoutResponse,
  OxaPayoutStatsResponse,
} from "./typings/OxapayTypes.js";

// [GET]
// export const fetchOxaBalance = async (): Promise<OxaBalanceResponse> =>
//   customFetch<OxaBalanceResponse>({
//     url: "/general/account/balance",
//     oxapay: true,
//     apiKeyType: "General",
//   });

// export const fetchOxaPayoutStats = async (
//   trackId: number
// ): Promise<OxaPayoutStatsResponse> =>
//   customFetch<OxaPayoutStatsResponse>({
//     url: `/payout/${trackId}`,
//     oxapay: true,
//     apiKeyType: "Payout",
//   });

export const fetchOxaInvoiceStatus = async (
  merchantApiKey: string,
  trackId: number
): Promise<OxaInvoiceStatusResponse> =>
  customFetch<OxaInvoiceStatusResponse>({
    url: `/payment/${trackId}`,
    oxapay: true,
    apiKeyType: "Merchant",
    merchantApiKey,
  });

// // [POST]
// export const sendOxaPayout = async (
//   payload: OxaPayoutPayload
// ): Promise<OxaPayoutResponse> =>
//   customFetch<OxaPayoutResponse>({
//     url: "/payout",
//     method: "POST",
//     body: payload,
//     apiKeyType: "Payout",
//     oxapay: true,
//   });

export const generateOxaInvoice = async (
  merchantApiKey: string,

  payload: OxaGenerateInvoicePayload
): Promise<OxaGenerateInvoiceResponse> =>
  customFetch<OxaGenerateInvoiceResponse>({
    url: "/payment/invoice",
    method: "POST",
    body: payload,
    apiKeyType: "Merchant",
    oxapay: true,
    merchantApiKey,
  });
