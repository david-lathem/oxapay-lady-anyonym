declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;

      // HTTP SERVER
      PORT: string;
      NODE_ENV: "production" | "development";

      // OXA_PAY
      OXAPAY_API_BASE_URL: string;
      OXAPAY_MERCHANT_API_KEY: string;

      // Forwarder
      FORWARD_FROM_CHANNEL_ID: string;
      FORWARD_TO_CHANNEL_ID: string;
    }
  }
}

// // If this file has no import/export statements (i.e. is a script)
// // convert it into a module by adding an empty export statement.
export {};
