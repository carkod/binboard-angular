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

  constructor(private http: HttpClient, private appload: AppLoadService) {
  }

  getSingleCoinStats(symbol) {
    const reqUrl = `${environment.db.base + environment.db.ticker24}/${symbol}`;
    const req = this.http.get(reqUrl, httpOptions);
    return req;
  }
  postNewCoin(content) {
    const reqUrl = `${environment.db.base + environment.db.tracker}`;
    const req = this.http.post(reqUrl, content, httpOptions);
    return req;
  }

  getTrackedCoins(): Observable<any> {
    const reqUrl = `${environment.db.base + environment.db.tracker}`;
    const req = this.http.get(reqUrl, httpOptions);
    return req;
  }
  deleteTrackedCoin(symbol) {
    const reqUrl = `${environment.db.base + environment.db.tracker}/${symbol}`;
    const req = this.http.delete(reqUrl, httpOptions);
    return req;
  }
  getCoinStats() {
    const reqUrl = `${environment.db.base + environment.db.ticker24}`;
    let req = this.http.get<any>(reqUrl);
    return req;
  }

  getExchange() {
    const reqUrl = `${environment.db.base + environment.db.exchangeInfo}`;
    let req = this.http.get<any>(reqUrl);
    return req;
  }
  getTicker(symbol?: String) {
    const reqUrl = `${environment.db.base + environment.db.ticker}/${symbol ? symbol : ''}`;
    let req = this.http.get<any>(reqUrl);
    return req;
  }
  getTicker24(symbol?: String) {
    const reqUrl = `${environment.db.base + environment.db.ticker24}/${symbol || ''}`;
    let req = this.http.get<any>(reqUrl);
    return req;
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
    const reqUrl = `${environment.db.base}${environment.db.serverTime}`;
    const req = this.http.get<any>(reqUrl);
    return req;
  }
  
  getAccount() {
    const reqUrl = `${environment.db.base}${environment.db.account}`;
    const req = this.http.get<any>(reqUrl, httpOptions);
    return req;
  }
  
  testOrder(symbol: String, side: string, type: string, quantity: number, price?: Number, timeInForce?: String, stopPrice?: Number) {
    const reqUrl = `${environment.db.base}${environment.db.order}?symbol=${symbol}&type=${type}&side=${side}&quantity=${quantity}${price ? '&price=' + price : ''}${timeInForce ? '&timeInForce=' + timeInForce : ''}${stopPrice ? '&stopPrice=' + stopPrice : ''}`;
    const req = this.http.post(reqUrl, {}, httpOptions);
    return req;
  }

  getMyTrades(symbol: String, startTime?: Number, endTime?: Number, fromId?: Number, limit?: Number) {
    const reqUrl = `${environment.db.base}${environment.db.myTrades}?symbol=${symbol}${limit ? '&limit=' + limit : ''}${startTime ? '&startTime=' + startTime : ''}${endTime ? '&endTime=' + endTime : ''}${fromId ? '&fromId=' + fromId : ''}`;
    const req = this.http.get(reqUrl, httpOptions);
    return req;
  }

  getOpenOrders(symbol?: string) {
    const reqUrl = `${environment.db.base}${environment.db.openOrders}?${symbol !== undefined ? '&symbol=' + symbol : ''}`;
    const req = this.http.get(reqUrl, httpOptions);
    return req;
  }
  getBookOrder(symbol: String, limit: Number) {
    const reqUrl = `${environment.db.base}${environment.db.orderBook}?${symbol !== undefined ? '&symbol=' + symbol : ''}${limit !== undefined ? '&limit=' + limit : 10}`;
    const req = this.http.get<any>(reqUrl, httpOptions);
    return req;
  }
  newOrder(symbol: String, side: string, type: string, quantity: number, price?: Number, timeInForce?: String, stopPrice?: Number) {
    const reqUrl = `${environment.db.base}${environment.db.order}?symbol=${symbol}&type=${type}&side=${side}&quantity=${quantity}${price ? '&price=' + price : ''}${timeInForce ? '&timeInForce=' + timeInForce : ''}${stopPrice ? '&stopPrice=' + stopPrice : ''}`;
    const req = this.http.post(reqUrl, {}, httpOptions);
    return req;
  }
  getOrderBook(symbol: String, limit: Number) {
    const reqUrl = `${environment.db.base}${environment.db.orderBook}?${symbol !== undefined ? '&symbol=' + symbol : ''}${limit !== undefined ? '&limit=' + limit : 10}`;
    const req = this.http.get<any>(reqUrl, httpOptions);
    return req;
  }
  /**
   * Use for local settings
   * @param type: string - setting type e.g. orders settings
   */
  getSettings(type: string) {
    const reqUrl = `${environment.db.base}${environment.db.settings}/${type}`;
    const req = this.http.get<any>(reqUrl, dbApiOptions);
    return req;
  }
  updateSettings(type: string, body: object) {
    const reqUrl = `${environment.db.base}${environment.db.settings}/${type}`;
    const req = this.http.put(reqUrl, body, dbApiOptions);
    return req;
  }
  getTradesHistory() {
    const reqUrl = `${environment.db.base}${environment.db.myTrades}`;
    const req = this.http.get(reqUrl, dbApiOptions);
    return req;
  }
  getAllOrders() {
    const reqUrl = `${environment.db.base}${environment.db.allOrders}`;
    const req = this.http.get(reqUrl, httpOptions);
    return req;
  }
}
