import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AskBidsDataSource } from './ask-bids-datasource';
import { DbService } from 'client/app/services/db.service';

@Component({
  selector: 'app/orders/ask-bids',
  templateUrl: './ask-bids.component.html',
  styleUrls: ['./ask-bids.component.css']
})
export class AskBidsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() symbol: string;

  dataSource: any;
  limit: Number;
  orders: any;
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['Ask price', 'Ask quantity'];

  constructor(private db: DbService) {
  }

  ngOnInit() {
    this.db.getOrderBook(this.symbol, this.limit).subscribe(orders => {
      const parseData = orders;
      this.orders = parseData.asks;
      debugger;
    })
    this.dataSource = new AskBidsDataSource(this.paginator, this.sort);
  }
}
