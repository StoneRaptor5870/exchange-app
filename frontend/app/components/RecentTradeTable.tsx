export const RecentTradesTable = ({ recentTrades, absolutePrice }: any) => {
  return (
    <div style={{ maxHeight: "530px", overflowY: "auto" }}>
      {recentTrades.map((trade: any, index: number) => (
        <TradeEntry
          key={index}
          absolutePrice={absolutePrice}
          price={trade.price}
          quantity={trade.quantity}
          time={new Date(trade.time).toLocaleTimeString("en-US", {
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        />
      ))}
    </div>
  );
};

function TradeEntry({ price, quantity, time, absolutePrice }: any) {
    const priceColor = price < absolutePrice ? "text-red-300" : "text-green-300";
  
    return (
      <div
        style={{
          display: "flex",
          position: "relative",
          width: "100%",
          backgroundColor: "transparent",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            background: "rgba(228, 75, 68, 0.325)",
            transition: "width 0.3s ease-in-out",
          }}
        ></div>
        <div className="flex justify-between text-xs w-full">
          <div className={priceColor}>{price}</div>
          <div>{quantity}</div>
          <div>{time}</div>
        </div>
      </div>
    );
  }
