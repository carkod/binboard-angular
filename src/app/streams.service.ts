import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, of , Subject, Observer } from 'rxjs';
import { map, filter, reduce } from 'rxjs/operators';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class StreamsService {
  
  private socket$;
  candlestick;
  private observer: Observer<any>;
  prevDate;

  constructor() { }

  /**
   * 
   * @param symbol {string} - e.g. onteth, ontology and ethereum exchange
   * @param interval {string}- string, 30m for 30 minutes, 1h for 1 hour
   */
  candlestickStream(symbol, interval) {
    let candlestickUrl = `${environment.ws.base}${symbol.toLowerCase()}@kline_${interval}`;
    let socket$ = new WebSocketSubject<any>(candlestickUrl);
    const updateObj = socket$.pipe(map(v => {
      const date = new Date(v.k.T);
      this.prevDate = date;
      const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      return {
        openPrices: v.k.o,
        closePrices: v.k.c,
        highPrices: v.k.h,
        lowPrices: v.k.l,
        closeTime: date,
        closeTimeRaw: date,
      }
    }));
    return updateObj;
  }
}
