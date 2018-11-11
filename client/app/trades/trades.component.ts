import { Component, OnInit, ViewChild } from '@angular/core';
import { BalanceService } from '../services/balance.service';
import { DbService } from '../services/db.service';
import { Subscription } from 'rxjs';
import { MatPaginator, MatSort } from '@angular/material';

@Component({
  selector: 'trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})
export class TradesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  currentTrades: Array<Object>;
  displayedColumns: ['asset', 'free'];
  isLoadingResults = false;

  balancesSubcription: Subscription;

  constructor(private db: DbService, private balances: BalanceService) { }

  ngOnInit() {
    this.currentTrades = [];
    this.balancesSubcription = this.balances.retrieveBalances().subscribe(data => {
      this.currentTrades.push(data);
    })
  }

  ngDestroy() {
    if (this.balancesSubcription) {
      this.balancesSubcription.unsubscribe();
    }
  }

  log(...text) {
    console.log(...text);
  }

}
