"use client";

import { useEffect, useState } from "react";
import { SignalingManager } from "../utils/SignalingManager";
import { RecentTradesTable } from "./RecentTradeTable";
import { getTicker } from "../utils/httpClient";

export default function RecentTrades({ market }: { market: string }) {
  const [recentTrades, setRecentTrades] = useState<any[]>([]);
  const [absolutePrice, setAbsolutePrice] = useState<string>();

  useEffect(() => {
    getTicker(market).then((t) => setAbsolutePrice(t.lastPrice));

    const handleTrade = (data: any) => {
      setRecentTrades((prevTrades) => [
        {
          price: data?.price ?? "",
          quantity: data?.quantity ?? "",
          time: data?.time ?? "",
        },
        ...prevTrades.slice(0, 39),
      ]);
    };

    SignalingManager.getInstance().registerCallback(
      "trade",
      handleTrade,
      `TRADE-${market}`
    );
    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`trade.${market}`],
    });

    return () => {
      SignalingManager.getInstance().deRegisterCallback(
        "trade",
        `TRADE-${market}`
      );
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`trade.${market}`],
      });
    };
  }, [market]);

  return (
    <div>
      <TableHeader />
      {recentTrades && (
        <RecentTradesTable
          recentTrades={recentTrades}
          absolutePrice={absolutePrice}
        />
      )}
    </div>
  );
}

function TableHeader() {
  return (
    <div>
      <div className="flex justify-center">Recent Trades</div>
      <div className="flex justify-between text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Quantity</div>
        <div className="text-slate-500">Time</div>
      </div>
    </div>
  );
}
