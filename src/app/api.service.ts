import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    
    'Content-Type':  'application/json',
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  // Candlestick Data
  symbol: string;
  interval: any = '1h' ;
  limit: number = 100;
  startTime?: any = '';
  endtime? : any = '';
  candlestickUrl: string;
  dataPoints; openPrices; closePrices; lowPrices; highPrices; closeTime; closeTimeRaw;

  // Ticker data
  tickerPrices;
  tickerUrl: string;

  constructor(private http: HttpClient) {
  }

  getCandlestick(symbol: string) {
    this.symbol = symbol;
    this.candlestickUrl= `${environment.api.candlestick}?symbol=${this.symbol}&interval=${this.interval}&limit=${this.limit}`;
    this.openPrices = []; this.closePrices = []; this.highPrices = []; this.lowPrices = []; this.closeTime = []; this.closeTimeRaw = [];
    this.dataPoints = this.http.get<any[]>(this.candlestickUrl).pipe(map(res => {
      for (let r of res ) {
        this.openPrices.push(r[1]);
        this.closePrices.push(r[4]);
        this.highPrices.push(r[2]);
        this.lowPrices.push(r[3]);

        const date = new Date(r[6]);
        const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        this.closeTimeRaw.push(date);
        this.closeTime.push(formatDate);
      }
      return {
        openPrices: this.openPrices,
        closePrices: this.closePrices,
        highPrices: this.highPrices,
        lowPrices: this.lowPrices,
        closeTime: this.closeTime,
        closeTimeRaw: this.closeTimeRaw,
      }
    }));
    return this.dataPoints;
  }

  getTicker(symbol) {
    this.tickerUrl = `${environment.api.candlestick}?symbol=${this.symbol}&interval=${this.interval}&limit=${this.limit}`;
    this.dataPoints = this.http.get<any[]>(this.tickerUrl);
  }


}
