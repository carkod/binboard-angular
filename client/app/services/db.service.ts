import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'X-MBX-APIKEY': environment.apiKey,
    'secretKey': environment.secretKey,
  })
};

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

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
  getCandlestick(symbol: string, interval: string, limit: number) {
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
  
  getAccount(timestamp, recvWindow?) {
    const coinsUrl = `${environment.db.base}${environment.db.account}?timestamp=${timestamp}&recvWindow=${recvWindow ? recvWindow : ''}`;
    const coins = this.http.get<any>(coinsUrl, httpOptions);
    return coins;
  }
  
  testOrder(recvWindow?) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.testOrder}?timestamp=${timestamp}&recvWindow=${recvWindow ? recvWindow : ''}`;
    const coins = this.http.post(coinsUrl, {}, httpOptions);
    return coins;
  }

  getMyTrades(symbol: string, recvWindow?: Number, startTime?: Number, endTime?: Number, fromId?: Number, limit?: Number) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.myTrades}?symbol=${symbol}&timestamp=${timestamp}&recvWindow=${recvWindow ? recvWindow : 5000}${limit ? '&limit=' + limit : ''}${startTime ? '&startTime=' + startTime : ''}${endTime ? '&endTime=' + endTime : ''}${fromId ? '&fromId=' + fromId : ''}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }

  getOpenOrders(symbol?: string, recvWindow?: Number) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.openOrders}?timestamp=${timestamp}&recvWindow=${recvWindow ? recvWindow : 5000}${symbol !== undefined ? '&symbol=' + symbol : ''}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }
  getBookOrder(symbol: string, limit: Number) {
    const coinsUrl = `${environment.db.base}${environment.db.orderBook}?${symbol !== undefined ? '&symbol=' + symbol : ''}${limit !== undefined ? '&limit=' + limit : 10}`;
    const coins = this.http.get<any>(coinsUrl, httpOptions);
    return coins;
  }
  newOrder(symbol: string, side: string, type: string, quantity: number, price?: Number, recvWindow?: number, timeInForce?: String, stopPrice?: Number) {
    const timestamp = +new Date;
    const coinsUrl = `${environment.db.base}${environment.db.order}?timestamp=${timestamp}&recvWindow=${recvWindow ? recvWindow : ''}&symbol=${symbol}&type=${type}&side=${side}&quantity=${quantity}${price ? '&price=' + price : ''}${timeInForce ? '&timeInForce=' + timeInForce : ''}${stopPrice ? '&stopPrice=' + stopPrice : ''}`;
    const coins = this.http.post(coinsUrl, {}, httpOptions);
    return coins;
  }
}
