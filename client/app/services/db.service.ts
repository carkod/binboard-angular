import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppLoadService } from './app-load-service.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

const dbApiOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  settingsType: string = 'global';
  recvWindow: number;

  constructor(private http: HttpClient, private appload: AppLoadService) {
    this.recvWindow = this.appload.recvWindow;
  }

  getSingleCoinStats(symbol) {
    const coinsUrl = `${environment.db.base + environment.db.ticker24}/${symbol}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }
  postNewCoin(content) {
    const coinsUrl = `${environment.db.base + environment.db.tracker}`;
    const coins = this.http.post(coinsUrl, content, httpOptions);
    return coins;
  }

  getTrackedCoins(): Observable<any> {
    const coinsUrl = `${environment.db.base + environment.db.tracker}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }
  deleteTrackedCoin(symbol) {
    const coinsUrl = `${environment.db.base + environment.db.tracker}/${symbol}`;
    const coins = this.http.delete(coinsUrl, httpOptions);
    return coins;
  }
  getCoinStats() {
    const coinsUrl = `${environment.db.base + environment.db.ticker24}`;
    let coins = this.http.get<any>(coinsUrl);
    return coins;
  }

  getExchange() {
    const coinsUrl = `${environment.db.base + environment.db.exchangeInfo}`;
    let coins = this.http.get<any>(coinsUrl);
    return coins;
  }
  getTicker() {
    const coinsUrl = `${environment.db.base + environment.db.ticker}`;
    let coins = this.http.get<any>(coinsUrl);
    return coins;
  }
  getCandlestick(symbol: String, interval: string, limit: number) {
    const candlestickUrl = `${environment.db.base + environment.db.candlestick}/${symbol}/${interval}/${limit}`;
    let klines = {
      openPrices: [],
      closePrices: [],
      highPrices: [],
      lowPrices: [],
      closeTime: [],
      // closeTimeRaw: closeTimeRaw,
    }
    const dataPoints = this.http.get<any>(candlestickUrl).pipe(map(res => {
      res = JSON.parse(res);
      for (let r of res) {
        klines.openPrices.push(r[1]);
        klines.closePrices.push(r[4]);
        klines.highPrices.push(r[2]);
        klines.lowPrices.push(r[3]);

        const date = new Date(r[6]);
        // const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        klines.closeTime.push(date);
      }
      return klines
    }));
    return dataPoints;
  }

  getServerTime() {
    const coinsUrl = `${environment.db.base}${environment.db.serverTime}`;
    const coins = this.http.get<any>(coinsUrl);
    return coins;
  }
  
  getAccount(timestamp) {
    const coinsUrl = `${environment.db.base}${environment.db.account}?timestamp=${timestamp}&recvWindow=${this.recvWindow}`;
    const coins = this.http.get<any>(coinsUrl, httpOptions);
    return coins;
  }
  
  testOrder(symbol: String, side: string, type: string, quantity: number, price?: Number, timeInForce?: String, stopPrice?: Number) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.order}?timestamp=${timestamp}&recvWindow=${this.recvWindow}&symbol=${symbol}&type=${type}&side=${side}&quantity=${quantity}${price ? '&price=' + price : ''}${timeInForce ? '&timeInForce=' + timeInForce : ''}${stopPrice ? '&stopPrice=' + stopPrice : ''}`;
    const coins = this.http.post(coinsUrl, {}, httpOptions);
    return coins;
  }

  getMyTrades(symbol: String, startTime?: Number, endTime?: Number, fromId?: Number, limit?: Number) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.myTrades}?symbol=${symbol}&timestamp=${timestamp}&recvWindow=${this.recvWindow}${limit ? '&limit=' + limit : ''}${startTime ? '&startTime=' + startTime : ''}${endTime ? '&endTime=' + endTime : ''}${fromId ? '&fromId=' + fromId : ''}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }

  getOpenOrders(symbol?: string) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.openOrders}?timestamp=${timestamp}&recvWindow=${this.recvWindow}${symbol !== undefined ? '&symbol=' + symbol : ''}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }
  getBookOrder(symbol: String, limit: Number) {
    const coinsUrl = `${environment.db.base}${environment.db.orderBook}?${symbol !== undefined ? '&symbol=' + symbol : ''}${limit !== undefined ? '&limit=' + limit : 10}`;
    const coins = this.http.get<any>(coinsUrl, httpOptions);
    return coins;
  }
  newOrder(symbol: String, side: string, type: string, quantity: number, price?: Number, timeInForce?: String, stopPrice?: Number) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.order}?timestamp=${timestamp}&recvWindow=${this.recvWindow}&symbol=${symbol}&type=${type}&side=${side}&quantity=${quantity}${price ? '&price=' + price : ''}${timeInForce ? '&timeInForce=' + timeInForce : ''}${stopPrice ? '&stopPrice=' + stopPrice : ''}`;
    const coins = this.http.post(coinsUrl, {}, httpOptions);
    return coins;
  }
  getOrderBook(symbol: String, limit: Number) {
    const coinsUrl = `${environment.db.base}${environment.db.orderBook}?${symbol !== undefined ? '&symbol=' + symbol : ''}${limit !== undefined ? '&limit=' + limit : 10}`;
    const coins = this.http.get<any>(coinsUrl, httpOptions);
    return coins;
  }
  /**
   * Use for local settings
   * @param type: string - setting type e.g. orders settings
   */
  getSettings(type: string) {
    const coinsUrl = `${environment.db.base}${environment.db.settings}/${type}`;
    const coins = this.http.get<any>(coinsUrl, dbApiOptions);
    return coins;
  }
  updateSettings(type: string, body: object) {
    const coinsUrl = `${environment.db.base}${environment.db.settings}/${type}`;
    const coins = this.http.put(coinsUrl, body, dbApiOptions);
    return coins;
  }
  getTradesHistory(symbol: String, limit?: number, fromId?: number) {
    const coinsUrl = `${environment.db.base}${environment.db.historicalTrades}?${symbol !== undefined ? '&symbol=' + symbol : ''}${limit !== undefined ? '&limit=' + limit : ''}${fromId ? '&fromId=' + fromId : ''}`;
    const coins = this.http.get(coinsUrl, dbApiOptions);
    return coins;
  }
  getAllOrders(symbol: String, startTime?: Number, endTime?: Number, fromId?: Number, limit?: Number) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.order}?symbol=${symbol}&timestamp=${timestamp}&recvWindow=${this.recvWindow}${limit ? '&limit=' + limit : ''}${startTime ? '&startTime=' + startTime : ''}${endTime ? '&endTime=' + endTime : ''}${fromId ? '&fromId=' + fromId : ''}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }
}
