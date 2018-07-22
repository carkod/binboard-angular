import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of , Subject, Observer } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class StreamsService {
  
  private subject: Subject<any>;
  private observer: Observer<any>;

  constructor() { }

  /**
   * 
   * @param symbol - e.g. onteth, ontology and ethereum exchange
   * @param interval - string, 30m for 30 minutes, 1h for 1 hour
   */
  getStream(symbol, interval) {
    let candlestick = `${environment.baseEndpoint}${symbol}@kline_${interval}`;
    let subject$ = webSocket(candlestick);
    console.log(candlestick)
    return subject$;

  }

  



}
