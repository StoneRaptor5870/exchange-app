import { Client } from 'pg';
import { configDotenv } from "dotenv";

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

async function initializeDB() {
  try {
    await connectToPostgres();

    await pgClient.query(`
      DROP TABLE IF EXISTS "tata_prices";
      CREATE TABLE "tata_prices"(
          time            TIMESTAMP WITH TIME ZONE NOT NULL,
          price           DOUBLE PRECISION,
          volume          DOUBLE PRECISION,
          currency_code   VARCHAR(10)
      );
    `);

    await pgClient.query(`
      SELECT create_hypertable('tata_prices', 'time', 'price', 2);
    `);

    await pgClient.query(`
      CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1m AS
      SELECT
          time_bucket('1 minute', time) AS bucket,
          first(price, time) AS open,
          max(price) AS high,
          min(price) AS low,
          last(price, time) AS close,
          sum(volume) AS volume,
          currency_code
      FROM tata_prices
      GROUP BY bucket, currency_code;
    `);

    await pgClient.query(`
      CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1h AS
      SELECT
          time_bucket('1 hour', time) AS bucket,
          first(price, time) AS open,
          max(price) AS high,
          min(price) AS low,
          last(price, time) AS close,
          sum(volume) AS volume,
          currency_code
      FROM tata_prices
      GROUP BY bucket, currency_code;
    `);

    await pgClient.query(`
      CREATE MATERIALIZED VIEW IF NOT EXISTS klines_1w AS
      SELECT
          time_bucket('1 week', time) AS bucket,
          first(price, time) AS open,
          max(price) AS high,
          min(price) AS low,
          last(price, time) AS close,
          sum(volume) AS volume,
          currency_code
      FROM tata_prices
      GROUP BY bucket, currency_code;
    `);

    console.log("Database initialized successfully");
  } catch (err) {
    console.error("Error during database initialization:", err);
  }
}

initializeDB().catch(console.error);
