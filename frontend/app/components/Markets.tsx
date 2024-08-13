"use client";

import { useEffect, useState } from "react";
import { Ticker } from "../utils/types";
import { getTickers } from "../utils/httpClient";
import { useRouter } from "next/navigation";

export default function Markets() {
  const [tickers, setTickers] = useState<Ticker[]>();

  useEffect(() => {
    getTickers().then((m) => setTickers(m));
  }, []);

  return (
    <div className="flex flex-col flex-1 max-w-full w-full px-4 lg:px-0">
      <div className="flex flex-col w-full overflow-x-auto">
        <div className="flex flex-col w-full rounded-lg bg-baseBackgroundL1 px-3 py-2 lg:px-5 lg:py-3">
          <table className="w-full table-auto min-w-full">
            <MarketHeader />
            <tbody>
              {tickers?.map((m) => (
                <MarketRow key={m.symbol} market={m} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MarketRow({ market }: { market: Ticker }) {
  const router = useRouter();
  return (
    <tr
      className="cursor-pointer border-t border-baseBorderLight hover:bg-white/7 w-full"
      onClick={() => router.push(`/trade/${market.symbol}`)}
    >
      <td className="px-1 py-3 flex items-center">
        {/* Mobile view */}
        <div className="flex items-center lg:hidden">
          <div
            className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed"
            style={{ width: "30px", height: "30px" }}
          >
            <img
              alt={market.symbol}
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
              }
              loading="lazy"
              width="30"
              height="30"
              className=""
            />
          </div>
          <div className="ml-2 flex flex-col">
            <p className="whitespace-nowrap text-base font-medium text-baseTextHighEmphasis">
              {market.symbol}
            </p>
          </div>
        </div>

        {/* Desktop view */}
        <div className="hidden lg:flex items-center">
          <div
            className="relative flex-none overflow-hidden rounded-full border border-baseBorderMed"
            style={{ width: "40px", height: "40px" }}
          >
            <img
              alt={market.symbol}
              src={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVvBqZC_Q1TSYObZaMvK0DRFeHZDUtVMh08Q&s"
              }
              loading="lazy"
              width="40"
              height="40"
              className=""
            />
          </div>
          <div className="ml-4 flex flex-col">
            <p className="whitespace-nowrap text-base font-medium text-baseTextHighEmphasis">
              {market.symbol}
            </p>
            <p className="text-xs text-baseTextMedEmphasis">
              {market.symbol}
            </p>
          </div>
        </div>
      </td>
      <td className="px-1 py-3 text-sm lg:text-base hidden lg:table-cell">
        <p className="font-medium tabular-nums">{market.lastPrice}</p>
      </td>
      <td className="px-1 py-3 text-sm lg:text-base hidden lg:table-cell">
        <p className="font-medium tabular-nums">{market.high}</p>
      </td>
      <td className="px-1 py-3 text-sm lg:text-base hidden lg:table-cell">
        <p className="font-medium tabular-nums">{market.volume}</p>
      </td>
      <td className="px-1 py-3 text-sm lg:text-base hidden lg:table-cell">
        <p className="font-medium tabular-nums text-greenText">
          {Number(market.priceChangePercent)?.toFixed(3)} %
        </p>
      </td>
    </tr>
  );
}

function MarketHeader() {
  return (
    <thead>
      <tr>
        <th className="px-2 py-3 text-left text-xs font-normal text-baseTextMedEmphasis lg:text-sm">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Name<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-xs font-normal text-baseTextMedEmphasis lg:text-sm hidden lg:table-cell">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Price<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-xs font-normal text-baseTextMedEmphasis lg:text-sm hidden lg:table-cell">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            Market Cap<span className="w-[16px]"></span>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-xs font-normal text-baseTextMedEmphasis lg:text-sm hidden lg:table-cell">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            24h Volume
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-down h-4 w-4"
            >
              <path d="M12 5v14"></path>
              <path d="m19 12-7 7-7-7"></path>
            </svg>
          </div>
        </th>
        <th className="px-2 py-3 text-left text-xs font-normal text-baseTextMedEmphasis lg:text-sm hidden lg:table-cell">
          <div className="flex items-center gap-1 cursor-pointer select-none">
            24h Change<span className="w-[16px]"></span>
          </div>
        </th>
      </tr>
    </thead>
  );
}
