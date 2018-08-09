import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of , Subject, Observer } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class StreamsService {
  symbol = 'trxeth';
  interval = '30m';

  candlestick = `${environment.baseEndpoint}${this.symbol}@kline_${this.interval}`;
  
  private subject: Subject<any>;
  private observer: Observer<any>;

  constructor() { }

  getStream() {
    // let subject$ = webSocket(this.candlestick);
    // console.log(this.candlestick)
    // return subject$;

  }
}
