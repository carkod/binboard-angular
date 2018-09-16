import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, Input, Output } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { CryptotableDataSource } from './cryptotable-datasource';
import { DbService } from '../../services/db.service';
import { AddNewComponent } from '../add-new/add-new.component';

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
export class CryptotableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() coinList;
  dataSource: CryptotableDataSource;
  actions: Actions = {
    edit: 'edit',
    delete: 'delete',
    view: 'view'
  };

  refreshInterval: number;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'price', 'change', 'changePercent', 'recommend', 'actions'];
  
  data: any;

  constructor(public db: DbService) {}

  ngOnInit() {
    this.data = []; this.refreshInterval = 15;
    this.dataSource = new CryptotableDataSource(this.paginator, this.sort, this.data);
    this.resetData();
    // setInterval(this.resetData(), this.refreshInterval * 60 * 1000);

  }
  ngOnChanges() {
    this.resetData();
  }

  edit() {

  }
  view() {

  }
  delete(symbol) {
    this.db.deleteTrackedCoin(symbol).subscribe(result => {
      console.log(result);
      this.resetData();
    });
  }
  resetData() {
    this.db.getTrackedCoins().subscribe(data => {
      this.data = data;
      this.dataSource = new CryptotableDataSource(this.paginator, this.sort, this.data);
    });
  }
}
