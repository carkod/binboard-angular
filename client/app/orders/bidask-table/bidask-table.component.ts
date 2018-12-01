
import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DbService } from 'client/app/services/db.service';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  bidColumns = ['price', 'quantity'];
  askColumns = ['price', 'quantity'];

  constructor(
    private db: DbService,
  ) {
    this.limit = 5;
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
    this.db.getOrderBook(this.symbol, this.limit).subscribe(orders => {
      const parseData = JSON.parse(orders);
      this.bids = parseData.bids;
      this.asks = parseData.asks;
      this.isLoadingResults = false;
    });
  }
}
