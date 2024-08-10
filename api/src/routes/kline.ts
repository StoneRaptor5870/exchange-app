import { Client } from "pg";
import { Router } from "express";
import { pgClient } from "..";

// const pgClient = new Client({
//   connectionString: process.env.POSTGRES,
// });

// async function connectToPostgres() {
//   try {
//     await pgClient.connect();
//     console.log("Successfully connected to PostgreSQL");
//   } catch (err) {
//     console.error("Failed to connect to PostgreSQL:", err);
//   }
// }

// connectToPostgres();

export const klineRouter = Router();

klineRouter.get("/", async (req, res) => {
  const { market, interval, startTime, endTime } = req.query;

  let query;
  switch (interval) {
    case "1m":
      query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2`;
      break;
    case "1h":
      query = `SELECT * FROM klines_1m WHERE bucket >= $1 AND bucket <= $2`;
      break;
    case "1w":
      query = `SELECT * FROM klines_1w WHERE bucket >= $1 AND bucket <= $2`;
      break;
    default:
      return res.status(400).send("Invalid interval");
  }

  try {
    //@ts-ignore
    const result = await pgClient.query(query, [ new Date((startTime * 1000) as string), new Date((endTime * 1000) as string)]);
    res.json(
      result.rows.map((x) => ({
        close: x.close,
        end: x.bucket,
        high: x.high,
        low: x.low,
        open: x.open,
        quoteVolume: x.quoteVolume,
        start: x.start,
        trades: x.trades,
        volume: x.volume,
      }))
    );
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});
