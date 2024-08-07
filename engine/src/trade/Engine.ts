import fs from "fs";
import { configDotenv } from "dotenv";
import { RedisManager } from "../RedisManager";
import { ORDER_UPDATE, TRADE_ADDED } from "../types/index";
import { CANCEL_ORDER, CREATE_ORDER, GET_DEPTH, GET_OPEN_ORDERS, MessageFromApi, ON_RAMP } from "../types/fromApi";
import { Fill, Order, Orderbook } from "./Orderbook";
configDotenv();
//TODO: Avoid floats everywhere, use a decimal similar to the PayTM project for every currency
export const BASE_CURRENCY = "INR";

interface UserBalance {
    [key: string]: {
        available: number;
        locked: number;
    }
}

export class Engine {}