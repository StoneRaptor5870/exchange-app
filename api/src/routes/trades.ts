import { Router, Request, Response } from "express";
import { Pool } from "pg";

const pool = new Pool({
  user: "your-username",
  host: "localhost",
  database: "your-database",
  password: "your-password",
  port: 5432,
});

export const tradesRouter = Router();

tradesRouter.get("/", async (req: Request, res: Response) => {
  const { market } = req.query;
  try {
    const result = await pool.query("SELECT * FROM trades WHERE market = $1", [market]);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching trades data:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});
