export const AskTable = ({ asks }: { asks: [string, string][] }) => {
    // Calculate cumulative totals for asks (from lowest to highest)
    const asksWithTotal = (asks || []).reduce(
        (acc, [price, quantity]) => {
          const cumulativeSize =
            acc.length === 0
              ? Number(quantity)
              : acc[acc.length - 1].cumulativeSize + Number(quantity);
          acc.push({ price, quantity, cumulativeSize });
          return acc;
        },
        [] as { price: string; quantity: string; cumulativeSize: number }[]
    );

    // Take the top 15 asks and reverse the order to display from largest to smallest ask
    const relevantAsks = asksWithTotal.slice(0, 15).reverse();

    // Calculate the max cumulative size for the top 15 asks
    const maxTotal = relevantAsks.length > 0 ? relevantAsks[0].cumulativeSize : 0;

    return <div>
        {relevantAsks.map(({ price, quantity, cumulativeSize }) => (
            <Ask 
                maxTotal={maxTotal} 
                total={cumulativeSize} 
                key={price} 
                price={price} 
                quantity={quantity} 
            />
        ))}
    </div>
}

function Ask({ price, quantity, total, maxTotal }: { price: string, quantity: string, total: number, maxTotal: number }) {
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
            background: "rgba(228, 75, 68, 0.325)",
            transition: "width 0.3s ease-in-out",
            }}
        ></div>
        <div className="flex justify-between text-xs w-full">
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
