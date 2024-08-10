import { configDotenv } from "dotenv";
import { Client } from "pg";
// import Redis from "ioredis";
import { RedisClientType, createClient } from "redis";
import { DbMessage } from "./types";

configDotenv();

const pgClient = new Client({
  connectionString: process.env.POSTGRES,
});

async function connectToPostgres() {
  try {
    await pgClient.connect();
    console.log("Connected to PostgreSQL database");
  } catch (err) {
    console.error("Error connecting to PostgreSQL:", err);
  }
}

let redisClient: RedisClientType;

async function connectToRedis() {
  try {
    redisClient = createClient({url: process.env.REDIS as string});

    redisClient.on("connect", () => {
      console.log("Connected to Redis Cloud");
    });

    redisClient.on("error", (err) => {
      console.error("Error connecting to Redis:", err);
    });

    redisClient.on("end", () => {
      console.log("Redis connection closed");
    });

    redisClient.on("reconnecting", (times: any) => {
      console.log(`Reconnecting to Redis (attempt ${times})...`);
    });

    redisClient.on("ready", () => {
      console.log("Redis connection ready");
    });

    await redisClient.connect();

    await new Promise((resolve, reject) => {
      redisClient.once("ready", resolve);
      redisClient.once("error", reject);
    });

  } catch (err) {
    console.error("Error during Redis connection setup:", err);
  }
}

async function refreshViews() {
  try {
    await pgClient.query("REFRESH MATERIALIZED VIEW klines_1m");
    await pgClient.query("REFRESH MATERIALIZED VIEW klines_1h");
    await pgClient.query("REFRESH MATERIALIZED VIEW klines_1w");

    console.log("Materialized views refreshed successfully");
  } catch (err) {
    console.error("Error refreshing materialized views:", err);
  }
}

async function main() {
  setInterval(() => {
    refreshViews().catch(console.error);
  }, 1000 * 1000);

  while (true) {
    try {
      const response = await redisClient.rPop("db_processor");
      if (!response) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        const data: DbMessage = JSON.parse(response);
        if (data.type === "TRADE_ADDED") {
          console.log("Adding data");
          console.log(data);
          const price = data.data.price;
          const timestamp = new Date(data.data.timestamp);
          const query = "INSERT INTO tata_prices (time, price) VALUES ($1, $2)";
          const values = [timestamp, price];

          try {
            await pgClient.query(query, values);
            console.log("Data inserted successfully");
          } catch (pgError) {
            console.error("Error inserting data into PostgreSQL:", pgError);
          }
        }
      }
    } catch (redisError) {
      console.error("Error processing Redis message:", redisError);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

(async () => {
  try {
    await connectToPostgres();
    await connectToRedis();
    await main();
  } catch (err) {
    console.error("Error during setup:", err);
  }
})();

process.on("SIGINT", async () => {
  console.log("Received SIGINT. Closing connections...");
  await pgClient.end();
  await redisClient.quit();
  console.log("Connections closed. Exiting...");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Received SIGTERM. Closing connections...");
  await pgClient.end();
  await redisClient.quit();
  console.log("Connections closed. Exiting...");
  process.exit(0);
});
