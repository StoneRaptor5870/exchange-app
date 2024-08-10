import { Router, Request, Response } from "express";
import { RedisManager } from "../RedisManager";
import { CREATE_ORDER, CANCEL_ORDER, ON_RAMP, GET_OPEN_ORDERS } from "../types";

export const orderRouter = Router();

orderRouter.post("/", async (req: Request, res: Response) => {
  const { market, price, quantity, side, userId } = req.body;
  console.log({ market, price, quantity, side, userId });

  const response = await RedisManager.getInstance().sendAndAwait({
    type: CREATE_ORDER,
    data: {
      market,
      price,
      quantity,
      side,
      userId,
    },
  });

  console.log(response);

  if (response.type === "ORDER_PLACED") {
    res.json({
      message: "Order Successfully Placed",
      orderId: response.payload.orderId,
      executedQty: response.payload.executedQty,
      fills: response.payload.fills,
    });
  } else if (response.type === "ORDER_CANCELLED") {
    res.status(400).json({
      message: "Order was cancelled",
      orderId: response.payload.orderId,
      executedQty: response.payload.executedQty,
      remainingQty: response.payload.remainingQty,
    });
  } else if (response.type === "OPEN_ORDERS") {
    res.json(response.payload);
  } else {
    res.status(400).json({ message: "Unknown response type" });
  }
});

orderRouter.delete("/", async (req, res) => {
  const { orderId, market } = req.body;
  const response = await RedisManager.getInstance().sendAndAwait({
    type: CANCEL_ORDER,
    data: {
      orderId,
      market,
    },
  });

  if (response.type === "ORDER_CANCELLED") {
    res.json({
      orderId: response.payload.orderId,
      executedQty: response.payload.executedQty,
      remainingQty: response.payload.remainingQty,
    });
  } else {
    res.status(400).json({ message: "Unknown response type" });
  }
});

orderRouter.get("/open", async (req, res) => {
  const response = await RedisManager.getInstance().sendAndAwait({
    type: GET_OPEN_ORDERS,
    data: {
      userId: req.query.userId as string,
      market: req.query.market as string,
    },
  });

  if (response.type === "OPEN_ORDERS") {
    res.json(response.payload);
  } else {
    res.status(400).json({ message: "Unknown response type" });
  }
});
