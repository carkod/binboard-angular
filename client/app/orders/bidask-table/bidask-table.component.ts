
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DbService } from 'client/app/services/db.service';
import { startWith, mergeMap } from 'rxjs/operators';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'bidask-table',
  templateUrl: './bidask-table.component.html',
  styleUrls: ['./bidask-table.component.scss']
})
export class BidaskTableComponent implements OnInit, OnChanges {
  @Input() symbol: string;

  limit: Number;
  bids: Array<String>;
  asks: Array<String>;
  isLoadingResults: Boolean = false;
  refreshInterval: number;

  loadDataSubs: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  bidColumns = ['price', 'quantity'];
  askColumns = ['price', 'quantity'];

  constructor(
    private db: DbService,
  ) {
    this.limit = 5;
    this.refreshInterval = 30000;
  }

  ngOnInit() {
    this.isLoadingResults = true;
  }

  ngOnChanges(c: SimpleChanges) {
    const { symbol } = c;
    if (symbol.previousValue !== symbol.currentValue) {
      this.loadData();
    }
  } 

  loadData() {
    this.loadDataSubs = interval(this.refreshInterval).pipe(startWith(0), mergeMap(() => {
      return this.db.getOrderBook(this.symbol, this.limit)
    }));

    this.loadDataSubs.subscribe(orders => {
      const parseData = JSON.parse(orders);
      this.bids = parseData.bids;
      this.asks = parseData.asks;
      this.isLoadingResults = false;
    });
  }
}
