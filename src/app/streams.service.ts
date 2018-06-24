import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StreamsService {
  symbol = 'trxeth';
  interval  = '30m';

  candlestick = `${environment.baseEndpoint}${this.symbol}@kline_${this.interval}`
  constructor() { }
}
