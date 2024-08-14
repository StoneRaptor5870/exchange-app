import { WebSocket } from "ws";
import { OutgoingMessage } from "./types/out";
import { SubscriptionManager } from "./SubscriptionManager";
import { IncomingMessage, SUBSCRIBE, UNSUBSCRIBE, SUBSCRIBE_TRADES } from "./types/in";

export class User {
  private id: string;
  private ws: WebSocket;

  constructor(id: string, ws: WebSocket) {
    this.id = id;
    this.ws = ws;
    this.addListeners();
  }

  private subscriptions: string[] = [];

  public subscribe(subscription: string) {
    this.subscriptions.push(subscription);
  }

  public unsubscribe(subscription: string) {
    this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
  }

  emit(message: OutgoingMessage) {
    this.ws.send(JSON.stringify(message));
  }

  private addListeners() {
    this.ws.on("message", (message: string) => {
      const parsedMessage: IncomingMessage = JSON.parse(message);
      if (parsedMessage.method === SUBSCRIBE) {
        parsedMessage.params.forEach((s): any =>
          SubscriptionManager.getInstance().subscribe(this.id, s)
        );
      }

      if (parsedMessage.method === UNSUBSCRIBE) {
        parsedMessage.params.forEach((s): any =>
          SubscriptionManager.getInstance().unsubscribe(
            this.id,
            parsedMessage.params[0]
          )
        );
      }

      if (parsedMessage.method === SUBSCRIBE_TRADES) {
        SubscriptionManager.getInstance().subscribeToTrades(this.id);
    }
    });
  }
}
