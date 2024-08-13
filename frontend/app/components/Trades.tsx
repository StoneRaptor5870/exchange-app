"use client";

import { useEffect, useState } from "react";
import { SignalingManager } from "../utils/SignalingManager";

export default function RecentTrades({ market }: { market: string }) {
    const [recentTrades, setRecentTrades] = useState<any[]>([]);

    useEffect(() => {
        const handleTrade = (data: any) => {
            setRecentTrades(prevTrades => [
                {
                    price: data?.price ?? '',
                    quantity: data?.quantity ?? '',
                    time: data?.time ?? '',
                },
                ...prevTrades.slice(0, 29)
            ]);
        };

        SignalingManager.getInstance().registerCallback("trade", handleTrade, `TRADE-${market}`);
        SignalingManager.getInstance().sendMessage({"method":"SUBSCRIBE","params":[`trade.${market}`]});

        return () => {
            SignalingManager.getInstance().deRegisterCallback("trade", `TRADE-${market}`);
            SignalingManager.getInstance().sendMessage({"method":"UNSUBSCRIBE","params":[`trade.${market}`]});
        };
    }, [market]);

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {recentTrades.map((trade, index) => (
                        <tr key={index}>
                            <td>{trade.price}</td>
                            <td>{trade.quantity}</td>
                            <td>{new Date(trade.time).toLocaleTimeString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
