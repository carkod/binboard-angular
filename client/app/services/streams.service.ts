import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class StreamsService {

  candlestick;
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
  getTicker(budget?: number, symbol?: string) {
    let minitickerUrl = `${environment.ws.base}${symbol.toLowerCase()}!miniTicker@arr`;
    let socket$ = new WebSocketSubject<any>(minitickerUrl);
    return socket$;
  }

}
