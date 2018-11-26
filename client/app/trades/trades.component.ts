import { Component, OnInit, ViewChild, OnDestroy, OnChanges, SimpleChange } from '@angular/core';
import { BalanceService } from '../services/balance.service';
import { DbService } from '../services/db.service';
import { Subscription, Observable } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit, OnDestroy, OnChanges {

  currentTrades: Array<any>;
  currentTradesProps: Array<String>;
  displayedColumns: Array<String> = ['asset', 'free', 'price', 'symbol', 'total'];
  totalBalance: String;

  balancesSubscription: Subscription;

  constructor(private db: DbService, private balances: BalanceService) { }

  ngOnInit() {
    this.currentTrades = [];
    this.balances.getTotalBalance().then(data => {
      this.currentTrades = data
    });
    this.balances.getBtcAmout().then(data => {
      this.totalBalance = data + ' BTC';
    })
  }

  ngOnDestroy() {
    if (this.balancesSubscription) {
      this.balancesSubscription.unsubscribe();
    }
  }

  ngOnChanges(changes) {
    console.log(changes)
  }

  log(...text) {
    console.log(...text);
  }

}
