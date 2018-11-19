import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { AskBidsDataSource } from './ask-bids-datasource';

@Component({
  selector: 'app/orders/ask-bids',
  templateUrl: './ask-bids.component.html',
  styleUrls: ['./ask-bids.component.css']
})
export class AskBidsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: AskBidsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new AskBidsDataSource(this.paginator, this.sort);
  }
}
