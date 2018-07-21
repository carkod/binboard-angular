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
  symbol: string = 'TRXETH';
  interval: any = '30m' ;
  limit: number = 50;
  startTime?: any = '';
  endtime? : any = '';
  candlestickUrl: string = `${environment.api.candlestick}?symbol=${this.symbol}&interval=${this.interval}&limit=${this.limit}`;
  dataPoints; openPrices; closePrices; lowPrices; highPrices; closeTime; closeTimeRaw;


  constructor(private http: HttpClient) {
  }

  getCandlestick() {
    this.openPrices = []; this.closePrices = []; this.highPrices = []; this.lowPrices = []; this.closeTime = []; this.closeTimeRaw = [];
    this.dataPoints = this.http.get<any[]>(this.candlestickUrl).pipe(map(res => {
      
      for (let r of res ) {
        this.openPrices.push(r[1]);
        this.closePrices.push(r[2]);
        this.highPrices.push(r[3]);
        this.lowPrices.push(r[4]);

        const date = new Date(r[6]);
        const formatDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        this.closeTimeRaw.push(date);
        this.closeTime.push(formatDate);
      }
      return {
        openPrices: this.openPrices,
        closePrices: this.closePrices,
        highPrices: this.closePrices,
        lowPrices: this.closePrices,
        closeTime: this.closeTime,
        closeTimeRaw: this.closeTimeRaw,
      }
    }));
    return this.dataPoints;
    // return candlestick;
  }


}
