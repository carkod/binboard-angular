import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { SinglePriceTicker } from '../models/services';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  getSingleCoinStats(symbol) {
    const coinsUrl = `${environment.db.ticker24}/${symbol}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }
  postNewCoin(content) {
    const coinsUrl = `${environment.db.tracker}`;
    const coins = this.http.post(coinsUrl, content, httpOptions);
    return coins;
  }

  getTrackedCoins(): Observable<any> {
    const coinsUrl = `${environment.db.tracker}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        // 'Authorization': 'my-auth-token'
      })
    };
    const coins = this.http.get(coinsUrl, httpOptions);

    // const coins = this.http.get<any>(coinsUrl, httpOptions).pipe(map(res => {
    //   return {
    //     name: res.symbol,
    //     symbol: res.symbol,
    //     id: res.id,
    //     price: res.lastPrice,
    //     change: res.priceChange,
    //     changePercent: res.priceChangePercent,
    //     recommend: res.recommend,
    //     closeTime: res.closeTime
    //   }
    // }));
    // return coins;
    return coins;
  }
  deleteTrackedCoin(symbol) {
    const coinsUrl = `${environment.db.base + environment.db.tracker}/${symbol}`;
    const coins = this.http.delete(coinsUrl, httpOptions);
    return coins;
  }
  getCoinStats() {
    const coinsUrl = `${environment.db.ticker24}`;
    let coins = this.http.get<any>(coinsUrl);
    return coins;
  }

  getExchange() {
    const coinsUrl = `${environment.db.exchangeInfo}`;
    let coins = this.http.get<any>(coinsUrl);
    return coins;
  }
  getTicker() {
    const coinsUrl = `${environment.db.ticker}`;
    let coins = this.http.get<any>(coinsUrl);
    return coins;
  }
  getCandlestick(symbol: string, interval: string, limit: number) {
    const candlestickUrl = `${environment.db.candlestick}/${symbol}/${interval}/${limit}`;
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

}
