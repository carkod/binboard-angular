import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BuyBidsDataSource } from './buy-bids-datasource';
import { DbService } from 'client/app/services/db.service';
import { BidsTicker } from 'client/app/models/components';

@Component({
  selector: 'app/orders/buy-bids',
  templateUrl: './buy-bids.component.html',
  styleUrls: ['./buy-bids.component.css']
})
export class BuyBidsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() symbol: string;

  dataSource: BuyBidsDataSource;
  limit: Number;
  orders: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['price', 'quantity'];

  constructor(
    private db: DbService,
  ) {
    this.limit = 10;
  }

  ngOnInit() {
    this.db.getOrderBook(this.symbol, this.limit).subscribe(orders => {
      const parseData = JSON.parse(orders);
      this.orders = parseData.bids;
    })
    this.dataSource = new BuyBidsDataSource(this.paginator, this.sort, this.orders);
  }
}
