import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Authorization': 'my-auth-token'
  })
};

export interface Tracking {
  symbol: string;
  interval: string;
  limit: number;
}

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor(private http: HttpClient) { }

  postNewCoin(content) {
    const coinsUrl = `${environment.db.base}/`;
    const coins = this.http.post<Tracking>(coinsUrl, content, httpOptions);
    return coins;
  }
  
}
