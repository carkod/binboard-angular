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
  displayedColumns: Array<String>;

  balancesSubscription: Subscription;

  constructor(private db: DbService, private balances: BalanceService) { }

  ngOnInit() {
    this.currentTrades = [];
    this.displayedColumns = ['asset', 'free'];
    this.balances.getAccount().subscribe(data =>  {
      this.currentTrades = data;
    });

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
