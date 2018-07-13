import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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
  candlestickUrl: string = `${environment.api.base + environment.api.candlestick}?symbol=${this.symbol}&interval=${this.interval}`;

  constructor(private http: HttpClient) {
    
  }

  getCandelstick() {
    return this.http.get('https://api.binance.com/api/v1/klines?symbol=TRXETH&interval=30m');
  }


}
