
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { DbService } from 'client/app/services/db.service';

@Component({
  selector: 'bidask-table',
  templateUrl: './bidask-table.component.html',
  styleUrls: ['./bidask-table.component.scss']
})
export class BidaskTableComponent implements OnInit {
  @Input() symbol: string;

  limit: Number;
  bids: Array<String>;
  asks: Array<String>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  bidColumns = ['price', 'quantity'];
  askColumns = ['price', 'quantity'];

  constructor(
    private db: DbService,
  ) {
    this.limit = 5;
  }

  ngOnInit() {
    this.db.getOrderBook(this.symbol, this.limit).subscribe(orders => {
      const parseData = JSON.parse(orders);
      this.bids = parseData.bids;
      this.asks = parseData.asks;
    })
  }
}
