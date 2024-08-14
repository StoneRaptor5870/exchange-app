export const SUBSCRIBE = "SUBSCRIBE";
export const UNSUBSCRIBE = "UNSUBSCRIBE";
export const SUBSCRIBE_TRADES = "SUBSCRIBE_TRADES";

export type SubscribeMessage = {
  method: typeof SUBSCRIBE;
  params: string[];
};

export type UnsubscribeMessage = {
  method: typeof UNSUBSCRIBE;
  params: string[];
};

export type subscribeTrade = {
  method: typeof SUBSCRIBE_TRADES;
  params: string;
}

export type IncomingMessage = SubscribeMessage | UnsubscribeMessage | subscribeTrade;
