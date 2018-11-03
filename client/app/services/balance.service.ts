import { Injectable } from '@angular/core';
import { DbService } from './db.service';
import { Observable } from 'rxjs';
import { IBalance } from '../models/services';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  accountData;
  serverTime: number;
  balances: Array<object>;
  baseCoin: string;

  constructor(private db: DbService) { 
    
  }

  getData() {
    let timestamp = +new Date;
    let recvWindow = 20000;
    this.db.getServerTime().subscribe(serverTime => {
      this.serverTime = +JSON.parse(serverTime).serverTime;
      if (timestamp < (this.serverTime + 1000) && (this.serverTime - timestamp) <= recvWindow) {
        this.db.getAccount(timestamp, recvWindow).subscribe(data => {
          this.accountData = JSON.parse(data);
          this.balances = this.accountData.balances.filter(x => parseFloat(x.free) > 0.0000000);
          return this.getBaseCoinPrice(this.balances)
        })
        
      } else {
        console.log('recvWindow delay, request not processed');
        return false
      }
    })
  }

  getBaseCoinPrice(balances) {
    this.baseCoin = 'ETH'
    this.db.getTicker().subscribe(prices => {
      console.log(prices, balances)
    })
  }

  sum(balances) {
    
    console.log(balances)
  }
}
