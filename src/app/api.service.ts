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
  dataPoints;
  openPrices;

  constructor(private http: HttpClient) {
  }

  getCandlestick(): Observable<any> {
    this.dataPoints = this.http.get<any[]>(this.candlestickUrl).pipe(map((d, i) => {
      this.openPrices = [];
      this.openPrices.push(d[i][0]);
      return this.openPrices;
    }));
    console.log(this.dataPoints)
    
    return this.dataPoints;
    // return candlestick;
  }


}
