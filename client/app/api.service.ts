import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

function errorHandler(payload) {
  const {code, msg} = payload;
  if (typeof code === 'number') throw msg;
  return payload;
}

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

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Candlestick Data
  symbol: string;
  interval: string;
  limit: number;
  startTime?: any = '';
  endtime?: any = '';
  candlestickUrl: string;
  dataPoints; openPrices; closePrices; lowPrices; highPrices; closeTime; closeTimeRaw;

  // Ticker data
  tickerPrices;
  tickerUrl: string;

  // All ticker data
  coins;
  coinsUrl;

  constructor(private http: HttpClient) {
  }

  /**
   * GET for candlestick base data (deffered time)
   * @param symbol - coin exchange symbol e.g. ONTETH (coin/reference coin)
   * @param interval - time interval in min
   * @param limit - max number of entries
   */
  getCandlestick(symbol: string, interval: string, limit: number) {
    this.symbol = symbol;
    this.interval = interval;
    this.limit = limit;
    this.candlestickUrl = `${environment.api.candlestick}?symbol=${this.symbol}&interval=${this.interval}&limit=${this.limit}`;
    this.openPrices = []; this.closePrices = []; this.highPrices = []; this.lowPrices = []; this.closeTime = []; this.closeTimeRaw = [];
    this.dataPoints = this.http.get<any[]>(this.candlestickUrl).pipe(map(res => {
      for (let r of res) {
        this.openPrices.push(r[1]);
        this.closePrices.push(r[4]);
        this.highPrices.push(r[2]);
        this.lowPrices.push(r[3]);

        const date = new Date(r[6]);
        // const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        this.closeTimeRaw.push(date);
        this.closeTime.push(date);
      }
      return {
        openPrices: this.openPrices,
        closePrices: this.closePrices,
        highPrices: this.highPrices,
        lowPrices: this.lowPrices,
        closeTime: this.closeTime,
        // closeTimeRaw: this.closeTimeRaw,
      }
    }));
    return this.dataPoints;
  }

  getTicker(symbol) {
    this.tickerUrl = `${environment.api.candlestick}?symbol=${this.symbol}&interval=${this.interval}&limit=${this.limit}`;
    this.dataPoints = this.http.get<any[]>(this.tickerUrl);
  }

  /**
   * Get Ticker for all coins
   * @param budget - money I possess to invest in this crypto
   */
  getCoins(budget?: number, symbol?: string) {
    this.coinsUrl = `${environment.api.ticker}${symbol ? '?symbol=' + symbol : ''}`;
    this.coins = budget ? this.http.get<any[]>(this.coinsUrl).pipe(map(res => res.filter(coin => coin.price < budget))) : this.http.get<SinglePriceTicker[]>(this.coinsUrl);
    return this.coins;
  }

  getCoinStats() {
    const coinsUrl = `${environment.api.ticker24}`;
    let coins = this.http.get<any>(coinsUrl);
    coins = errorHandler(coins);
    return coins;
  }

  getSinglCoinStats(symbol: string) {
    const coinsUrl = `${environment.api.ticker}/${symbol}`;
    const coins = this.http.get<any>(coinsUrl);
    return coins;
  }
  getExchange() {
    const coinsUrl = `${environment.api.exchange}`;
    const coins = this.http.get<any>(coinsUrl);
    return coins;
  }
}
