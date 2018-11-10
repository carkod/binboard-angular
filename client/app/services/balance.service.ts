import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Observable } from 'rxjs';
import { IBalances, ITotalBalance } from '../models/services';
import { mergeMap, concatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  accountData;
  timestamp;
  recvWindow;
  serverTime: number;
  balances: Array<IBalances>;
  baseCoin: Array<String>;
  tickerPrices: Array<any>;
  totalBalance: Array<any>;

  getServerTimeSubs$: Observable<any>;
  getAccountSubs$: Observable<any>;

  constructor(private db: DbService) {
    this.timestamp = +new Date;
    this.recvWindow = 20000;
    this.baseCoin = [];
    this.tickerPrices = [];
    this.totalBalance = [];
  }

  loadData(): Observable<any> {
    return this.db.getServerTime().pipe(concatMap(serverTime => {
      this.serverTime = +JSON.parse(serverTime).serverTime;
      if (this.timestamp < (this.serverTime + 1000) && (this.serverTime - this.timestamp) <= this.recvWindow) {
        return this.db.getAccount(this.timestamp, this.recvWindow).pipe(concatMap(data => {
          this.accountData = JSON.parse(data);
          this.balances = this.accountData.balances.filter(x => parseFloat(x.free) > 0.0000000);
          console.log(this.balances);
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
            this.totalBalance = this.balances.map(x => {
              for (const item of this.tickerPrices) {
                let newObj;
                if (item.symbol.indexOf(x.asset) === 0) {
                  return {
                    symbol: item.symbol,
                    price: item.price,
                    asset: x.asset,
                    free: x.free,
                  }
                }
              }
            });

            console.log(this.totalBalance)
            return this.tickerPrices;
          }))
        }));
      }
    }))
  }

  // private getBaseCoinPrice(balances) {
  //   return this.db.getTicker().pipe(mergeMap(prices => {
  //     const arr = JSON.parse(prices);
  //     this.balances.forEach(element => {
  //       const matchBaseCoin = arr.find(x => {
  //         return x.symbol === (element.asset + this.baseCoin);
  //       });
  //       if (matchBaseCoin !== undefined) {
  //         this.tickerPrices.push(matchBaseCoin);
  //       }
  //     });
  //     return this.tickerPrices;
  //   }))

  // }

  getBaseAssets(): Observable<String> {
    return this.db.getExchange().pipe(map(info => {
      const { symbols } = JSON.parse(info);
      let exchanges = symbols.reduce(function (allQuotes, { quoteAsset }) {
        const findObj = allQuotes.findIndex(x => x === quoteAsset);
        if (allQuotes.length === 0 || findObj === -1) {
          allQuotes.push(quoteAsset);
        }
        return allQuotes;
      }, []);
      this.baseCoin = exchanges;
      return exchanges;
    }));

    // return this.db.getExchange().subscribe(info => {
    //   const { symbols } = JSON.parse(info);
    //   let exchanges = symbols.reduce(function (allQuotes, { quoteAsset }) {
    //     const findObj = allQuotes.findIndex(x => x === quoteAsset);
    //     if (allQuotes.length === 0 || findObj === -1) {
    //       allQuotes.push(quoteAsset);
    //     }
    //     return allQuotes;
    //   }, []);
    //   console.log('exchange info::', exchanges);
    //   return exchanges;
    // });
  }

}
