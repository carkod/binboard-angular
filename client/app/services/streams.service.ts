import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { WebSocketSubject } from 'rxjs/webSocket';

export class MiniTicker24 {
  e: string;          // Event type
  E: number;          // Event time
  s: string;          // Symbol
  c: string;          // Current day's close price
  o: string;          // Open price
  h: string;          // High price
  l: string;          // Low price
  v: string;          // Total traded base asset volume
  q: string;          // Total traded quote asset volume
}

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
