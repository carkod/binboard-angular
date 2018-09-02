import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CryptotableDataSource } from './cryptotable-datasource';
import { DbService } from '../../services/db.service';

export interface Actions {
  edit: string;
  delete: string;
  view: string;
}

@Component({
  selector: 'cryptotable',
  templateUrl: './cryptotable.component.html',
  styleUrls: ['./cryptotable.component.scss']
})
export class CryptotableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: CryptotableDataSource;
  actions: Actions = {
    edit: 'edit',
    delete: 'delete',
    view: 'view'
  };

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'price', 'change', 'changePercent', 'recommend', 'actions'];
  
  data: any;

  constructor(public api: DbService) {}

  ngOnInit() {
    this.data = [];
    this.dataSource = new CryptotableDataSource(this.paginator, this.sort, this.data);
    this.api.getTrackedCoins().subscribe(data => {
      this.data = data;
      this.dataSource = new CryptotableDataSource(this.paginator, this.sort, this.data);
    })
  }
  
  edit() {

  }
  view() {

  }
  delete() {

  }
  log(...text) {
    console.log(...text);
  }
}
