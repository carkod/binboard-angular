import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Observable } from 'rxjs';
import { IBalances } from '../models/services';
import { mergeMap, concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  accountData;
  timestamp;
  recvWindow;
  serverTime: number;
  balances: Array<IBalances>;
  baseCoin: string;
  tickerPrices: Array<any>;

  getServerTimeSubs$: Observable<any>;
  getAccountSubs$: Observable<any>;

  constructor(private db: DbService) {
    this.timestamp = +new Date;
    this.recvWindow = 20000;
    this.baseCoin = 'ETH';
    this.tickerPrices = []
  }

  loadData(): Observable<any> {
    return this.db.getServerTime().pipe(concatMap(serverTime => {
      this.serverTime = +JSON.parse(serverTime).serverTime;
      if (this.timestamp < (this.serverTime + 1000) && (this.serverTime - this.timestamp) <= this.recvWindow) {
        return this.db.getAccount(this.timestamp, this.recvWindow).pipe(concatMap(data => {
          this.accountData = JSON.parse(data);
          this.balances = this.accountData.balances.filter(x => parseFloat(x.free) > 0.0000000);
          return this.db.getTicker().pipe(concatMap(prices => {
            const arr = JSON.parse(prices);
            this.balances.forEach(element => {
              const matchBaseCoin = arr.find(x => {
                return x.symbol === (element.asset + this.baseCoin);
              });
              if (matchBaseCoin !== undefined) {
                this.tickerPrices.push(matchBaseCoin);
              }
            });
            return this.tickerPrices;
          }))
        }));
      } 
    }))
  }

  // getData() {
  //   this.db.getServerTime().subscribe(serverTime => {
  //     this.serverTime = +JSON.parse(serverTime).serverTime;
  //     if (this.timestamp < (this.serverTime + 1000) && (this.serverTime - this.timestamp) <= this.recvWindow) {
  //       this.db.getAccount(this.timestamp, this.recvWindow).subscribe(data => {
  //         this.accountData = JSON.parse(data);
  //         this.balances = this.accountData.balances.filter(x => parseFloat(x.free) > 0.0000000);
  //         return this.getBaseCoinPrice(this.balances);
  //       });
  //     } else {
  //       console.log('recvWindow delay, request not processed');
  //       return false
  //     };
  //   })
  // }

  private getBaseCoinPrice(balances) {
    return this.db.getTicker().pipe(mergeMap(prices => {
      const arr = JSON.parse(prices);
      this.balances.forEach(element => {
        const matchBaseCoin = arr.find(x => {
          return x.symbol === (element.asset + this.baseCoin);
        });
        if (matchBaseCoin !== undefined) {
          this.tickerPrices.push(matchBaseCoin);
        }
      });
      return this.tickerPrices;
    }))
    
  }

  totalBalance(tickerPrice) {
    // console.log(balances)
  }
}
