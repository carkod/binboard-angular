import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  postNewCoin(content) {
    const coinsUrl = `${environment.db.base + environment.db.tracker}`;
    const coins = this.http.post(coinsUrl, content, httpOptions);
    return coins;
  }
  getSingleCoinStats({ symbol }) {
    const coinsUrl = `${environment.db.base + environment.db.ticker24}/${symbol}`;
    const coins = this.http.get(coinsUrl, httpOptions);
    return coins;
  }
  getTrackedCoins(): Observable<any> {
    const coinsUrl = `${environment.db.base + environment.db.tracker}`;
    const coins = this.http.get<any>(coinsUrl, httpOptions);
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
    return coins;
  }

}
