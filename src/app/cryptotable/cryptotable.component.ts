import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CryptotableDataSource } from './cryptotable-datasource';

@Component({
  selector: 'cryptotable',
  templateUrl: './cryptotable.component.html',
  styleUrls: ['./cryptotable.component.scss']
})
export class CryptotableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CryptotableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new CryptotableDataSource(this.paginator, this.sort);
  }
}
