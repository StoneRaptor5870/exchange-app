interface Order {
  price: number;
  quantity: number;
  orderId: string;
}

interface Bid extends Order {
  side: 'bid';
}

interface Ask extends Order {
  side: 'ask';
}

interface Orderbook {
  bids: Bid[];
  asks: Ask[];
}

interface PriceQuantityMap {
  [price: number]: number;
}

interface BookWithQuantity {
  bids: PriceQuantityMap;
  asks: PriceQuantityMap;
}

export const orderbook: Orderbook = {
  bids: [],
  asks: []
}

export const bookWithQuantity: BookWithQuantity = {
  bids: {},
  asks: {}
}