"use client";

import { Depth } from "@/app/components/depth/Depth";
import { MarketBar } from "@/app/components/MarketBar";
import { SwapUI } from "@/app/components/SwapUI";
import RecentTrades from "@/app/components/Trades";
import { TradeView } from "@/app/components/TradeView";
import { useParams } from "next/navigation";

export default function Page() {
  const { market } = useParams();

  return (
    <div className="flex flex-col lg:flex-row flex-1">
      <div className="flex flex-col flex-1">
        <MarketBar market={market as string} />
        <div className="flex flex-col lg:flex-row h-auto lg:h-[920px] border-y border-slate-800 gap-4">
          <div className="flex flex-col flex-1">
            <TradeView market={market as string} />
          </div>
          <div className="flex flex-col w-full lg:w-[250px] overflow-hidden">
            <Depth market={market as string} />
          </div>
          <div className="flex flex-col w-full lg:w-[250px] overflow-hidden">
            <RecentTrades market={market as string} />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[10px] flex-col border-slate-800 lg:border-l"></div>
      <div>
        <div className="flex flex-col w-full lg:w-[250px]">
          <SwapUI market={market as string} />
        </div>
      </div>
    </div>
  );
}
