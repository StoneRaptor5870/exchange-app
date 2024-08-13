export const BidTable = ({ bids }: {bids: [string, string][]}) => {
    // Calculate cumulative totals for bids (from highest to lowest)
    const bidsWithTotal = (bids || []).reduce((acc, [price, quantity]) => {
        const cumulativeSize =
          acc.length === 0
            ? Number(quantity)
            : acc[acc.length - 1].cumulativeSize + Number(quantity);
        acc.push({ price, quantity, cumulativeSize });
        return acc;
      }, [] as { price: string; quantity: string; cumulativeSize: number }[]);

    // Take the top 15 bids
    const relevantBids = bidsWithTotal.slice(0, 15);

    // Calculate the max cumulative size for the top 15 bids
    const maxTotal = relevantBids.length > 0 ? relevantBids[relevantBids.length - 1].cumulativeSize : 0;

    return <div>
        {relevantBids?.map(({ price, quantity, cumulativeSize }) => (
            <Bid 
                maxTotal={maxTotal} 
                total={cumulativeSize} 
                key={price} 
                price={price} 
                quantity={quantity} 
            />
        ))}
    </div>
}

function Bid({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
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
            width: `${(100 * total) / maxTotal}%`,
            height: "100%",
            background: "rgba(1, 167, 129, 0.325)",
            transition: "width 0.3s ease-in-out",
            }}
        ></div>
            <div className={`flex justify-between text-xs w-full`}>
                <div>
                    {price}
                </div>
                <div>
                    {quantity}
                </div>
                <div>
                    {total.toFixed(2)}
                </div>
            </div>
        </div>
    );
}
