import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BuyBidsDataSource } from './buy-bids-datasource';
import { DbService } from 'client/app/services/db.service';

@Component({
  selector: 'app/orders/buy-bids',
  templateUrl: './buy-bids.component.html',
  styleUrls: ['./buy-bids.component.css']
})
export class BuyBidsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BuyBidsDataSource;
  limit: Number;
  @Input() symbol: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  constructor(
    private db: DbService,
  ) {
    this.limit = 10;
  }

  ngOnInit() {
    this.db.getBookOrder(this.symbol, this.limit).subscribe(orders => {

    })
    this.dataSource = new BuyBidsDataSource(this.paginator, this.sort);
  }
}
