// import { RedisClientType, createClient } from "redis";
import Redis from "ioredis";
import { MessageFromOrderbook } from "./types/index";
import { MessageToEngine } from "./types/to";

export class RedisManager {
  private client: Redis;
  private publisher: Redis;
  private static instance: RedisManager;

  private constructor() {
    this.client = new Redis(process.env.REDIS as string);
    this.publisher = new Redis(process.env.REDIS as string);
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public sendAndAwait(message: MessageToEngine) {
    return new Promise<MessageFromOrderbook>((resolve) => {
      const id = this.getRandomClientId();
      this.client.subscribe(id, (message) => {
        this.client.unsubscribe(id);
        //@ts-ignore
        resolve(JSON.parse(message));
      });
      this.publisher.lpush(
        "messages",
        JSON.stringify({ clientId: id, message })
      );
    });
  }

  public getRandomClientId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
