import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { RankingTableDataSource } from './ranking-table-datasource';
import { ApiService } from '../../api.service';

@Component({
  selector: 'ranking-table',
  templateUrl: './ranking-table.component.html',
  styleUrls: ['./ranking-table.component.scss']
})
export class RankingTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['symbol', 'price'];

  constructor(private api: ApiService) {

  }
  ngAfterViewInit() {
   this.dataSource.paginator = this.paginator;   
   this.dataSource.sort = this.sort;   
  }
  ngOnInit() {
    this.api.getCoins().subscribe(data => {
      this.dataSource.data = data;
      // this.dataSource = new RankingTableDataSource(this.paginator, this.sort);
    })

    

  }
}
