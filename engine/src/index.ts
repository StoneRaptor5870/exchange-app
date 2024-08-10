import { createClient } from "redis";
// import Redis from "ioredis";
import { Engine } from "./trade/Engine";

async function main() {
  const engine = new Engine();
  const redisClient = createClient({url: process.env.REDIS as string});
  await redisClient.connect();
  console.log("connected to redis");

  while (true) {
    const response = await redisClient.rPop("messages" as string);
    if (!response) {
    } else {
      engine.process(JSON.parse(response));
    }
  }
}

main();
