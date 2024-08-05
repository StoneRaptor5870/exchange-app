import { configDotenv } from "dotenv";
import cors from "cors";
import express from "express";
import { orderRouter } from "./routes/order";

configDotenv();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/order", orderRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});