import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of , Subject, Observer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class StreamsService {
  
  private socket$: WebSocketSubject<any>;
  private observer: Observer<any>;

  constructor() { }

  /**
   * 
   * @param symbol - e.g. onteth, ontology and ethereum exchange
   * @param interval - string, 30m for 30 minutes, 1h for 1 hour
   */
  getStream(symbol, interval) {
    let candlestick = `${environment.ws.base}${symbol.toLowerCase()}@kline_${interval}`;
    console.log(candlestick)
    this.socket$ = WebSocketSubject.create(candlestick);
    return this.socket$;
  }

  



}
