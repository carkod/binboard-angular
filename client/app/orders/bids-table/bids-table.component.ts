import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { BidsTableDataSource } from './bids-table-datasource';

@Component({
  selector: 'app/orders/bids-table',
  templateUrl: './bids-table.component.html',
  styleUrls: ['./bids-table.component.css']
})
export class BidsTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: BidsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new BidsTableDataSource(this.paginator, this.sort);
  }
}
