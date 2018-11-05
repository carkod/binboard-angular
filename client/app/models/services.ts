export interface SymbolPriceTicker {
  symbol: string,
  price: string,
}

export class SinglePriceTicker {
  symbol: string;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  askPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  closeTime: number;
  firstId: number;   // First tradeId
  lastId: number;    // Last tradeId
  count: number;        // Trade count
}

export class MiniTicker24 {
  e: string;          // Event type
  E: number;          // Event time
  s: string;          // Symbol
  c: string;          // Current day's close price
  o: string;          // Open price
  h: string;          // High price
  l: string;          // Low price
  v: string;          // Total traded base asset volume
  q: string;          // Total traded quote asset volume
}


export interface Tracking {
  // Most are Ticker variables
  symbol: string;
  id: string; // Only tracking interface
  price: string;
  change: string;
  changePercent: string;
  recommend: string;
  closeTime: number;
  priceChange: string;
  priceChangePercent: string;
  weightedAvgPrice: string;
  prevClosePrice: string;
  lastPrice: string;
  lastQty: string;
  bidPrice: string;
  askPrice: string;
  openPrice: string;
  highPrice: string;
  lowPrice: string;
  volume: string;
  quoteVolume: string;
  openTime: number;
  firstId: number;   // First tradeId
  lastId: number;    // Last tradeId
  count: number;        // Trade count
}


export interface Global {
  interval?: string;
  limit?: number;
}

export interface IBalance {
  asset: string,
  free: string,
  locked: string,
}

export interface IBalances {
  asset: string,
  free: string,
  locked: string
}