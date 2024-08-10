import { RedisClientType, createClient } from "redis";
// import Redis from "ioredis";
import { MessageFromOrderbook } from "./types/index";
import { MessageToEngine } from "./types/to";

export class RedisManager {
  private client: RedisClientType;
  private publisher: RedisClientType;
  private static instance: RedisManager;

  private constructor() {
    this.client = createClient({ url: process.env.REDIS as string });
    this.client
      .connect()
      .then(() => {
        console.log("Connected to Redis as client");
      })
      .catch((err) => {
        console.error("Failed to connect to Redis as client:", err);
      });

    this.publisher = createClient({ url: process.env.REDIS as string });
    this.publisher
      .connect()
      .then(() => {
        console.log("Connected to Redis as publisher");
      })
      .catch((err) => {
        console.error("Failed to connect to Redis as publisher:", err);
      });
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new RedisManager();
    }
    return this.instance;
  }

  public sendAndAwait(message: MessageToEngine) {
    return new Promise<MessageFromOrderbook>((resolve, reject) => {
      const id = this.getRandomClientId();
      console.log("Generated clientId:", id);

      // Subscribe to the specific channel for responses
      this.client.subscribe(id, (message) => {
        console.log(
          "Subscribed and received message on channel:",
          id,
          "with message:",
          message
        );
        this.client.unsubscribe(id); // Unsubscribe after receiving the message
        try {
          const parsedMessage = JSON.parse(message);
          console.log("Parsed message:", parsedMessage);
          resolve(parsedMessage);
        } catch (error) {
          console.error("Error parsing message:", error);
          reject(error);
        }
      });

      // Push the message to the queue
      console.log("Pushing message to queue with clientId:", id);
      this.publisher.lPush(
        "messages",
        JSON.stringify({ clientId: id, message })
      );

      // Publish the message to a pub/sub channel
      console.log("Publishing message to pub/sub channel with clientId:", id);
      this.publisher.publish(id, JSON.stringify(message));
    });
  }

  public getRandomClientId() {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }
}
