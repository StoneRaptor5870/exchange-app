import { configDotenv } from "dotenv";
import cors from "cors";
import { Client } from "pg";
import express from "express";
import { orderRouter } from "./routes/order";
import { depthRouter } from "./routes/depth";
import { tradesRouter } from "./routes/trades";
import { klineRouter } from "./routes/kline";
import { tickersRouter } from "./routes/ticker";

configDotenv();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

export const pgClient = new Client({
  connectionString: process.env.POSTGRES,
});

async function connectToPostgres() {
  try {
    await pgClient.connect();
    console.log("Successfully connected to PostgreSQL");
  } catch (err) {
    console.error("Failed to connect to PostgreSQL:", err);
  }
}

app.use("/api/v1/order", orderRouter);
app.use("/api/v1/depth", depthRouter);
app.use("/api/v1/trades", tradesRouter);
app.use("/api/v1/klines", klineRouter);
app.use("/api/v1/tickers", tickersRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

connectToPostgres();