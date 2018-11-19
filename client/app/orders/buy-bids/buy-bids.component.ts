import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BuyBidsDataSource } from './buy-bids-datasource';

@Component({
  selector: 'app/orders/buy-bids',
  templateUrl: './buy-bids.component.html',
  styleUrls: ['./buy-bids.component.css']
})
export class BuyBidsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BuyBidsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new BuyBidsDataSource(this.paginator, this.sort);
  }
}
