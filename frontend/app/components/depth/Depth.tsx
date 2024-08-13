"use client";

import { useEffect, useState } from "react";
import {
  getDepth,
  getKlines,
  getTicker,
  getTrades,
} from "../../utils/httpClient";
import { BidTable } from "./BidTable";
import { AskTable } from "./AskTable";
import { SignalingManager } from "../../utils/SignalingManager";

export function Depth({ market }: { market: string }) {
  const [bids, setBids] = useState<[string, string][]>();
  const [asks, setAsks] = useState<[string, string][]>();
  const [price, setPrice] = useState<string>();

  useEffect(() => {
    SignalingManager.getInstance().registerCallback(
      "depth",
      (data: any) => {
        console.log("depth has been updated");
        console.log(data);

        // Update bids
        setBids((originalBids) => {
          const bidsAfterUpdate = [...(originalBids || [])];

          // Update existing bids
          data.bids.forEach(([price, quantity]: [string, string]) => {
            const index = bidsAfterUpdate.findIndex((bid) => bid[0] === price);
            if (index !== -1) {
              bidsAfterUpdate[index][1] = quantity;
            } else if (Number(quantity) !== 0) {
              // Add new bid
              bidsAfterUpdate.push([price, quantity]);
            }
          });

          // Remove bids with quantity 0
          const updatedBids = bidsAfterUpdate.filter(
            ([_, quantity]) => Number(quantity) !== 0
          );

          // Sort bids in descending order by price
          updatedBids.sort((x, y) => Number(y[0]) - Number(x[0]));

          return updatedBids;
        });

        // Update asks
        setAsks((originalAsks) => {
          const asksAfterUpdate = [...(originalAsks || [])];

          // Update existing asks
          data.asks.forEach(([price, quantity]: [string, string]) => {
            const index = asksAfterUpdate.findIndex((ask) => ask[0] === price);
            if (index !== -1) {
              asksAfterUpdate[index][1] = quantity;
            } else if (Number(quantity) !== 0) {
              // Add new ask
              asksAfterUpdate.push([price, quantity]);
            }
          });

          // Remove asks with quantity 0
          const updatedAsks = asksAfterUpdate.filter(
            ([_, quantity]) => Number(quantity) !== 0
          );

          // Sort asks in ascending order by price
          updatedAsks.sort((x, y) => Number(x[0]) - Number(y[0]));

          return updatedAsks;
        });
      },
      `DEPTH-${market}`
    );

    SignalingManager.getInstance().sendMessage({
      method: "SUBSCRIBE",
      params: [`depth.200ms.${market}`],
    });

    getDepth(market).then((d) => {
      setBids(d.bids);
      setAsks(d.asks);
    });

    getTicker(market).then((t) => setPrice(t.lastPrice));
    getTrades(market).then((t) => setPrice(t[0].price));

    return () => {
      SignalingManager.getInstance().sendMessage({
        method: "UNSUBSCRIBE",
        params: [`depth.200ms.${market}`],
      });
      SignalingManager.getInstance().deRegisterCallback(
        "depth",
        `DEPTH-${market}`
      );
    };
  }, []);

  return (
    <div>
      <TableHeader />
      {asks && <AskTable asks={asks} />}
      {price && <div>{price}</div>}
      {bids && <BidTable bids={bids} />}
    </div>
  );
}

function TableHeader() {
  return (
    <div>
      <div className="flex justify-center">Asks & Bids</div>
      <div className="flex justify-between text-xs">
        <div className="text-white">Price</div>
        <div className="text-slate-500">Size</div>
        <div className="text-slate-500">Total</div>
      </div>
    </div>
  );
}
