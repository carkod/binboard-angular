import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { RankingTableDataSource } from './ranking-table-datasource';
import { DbService } from '../../services/db.service';
import { interval } from 'rxjs';
import { startWith, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'ranking-table',
  templateUrl: './ranking-table.component.html',
  styleUrls: ['./ranking-table.component.scss']
})
export class RankingTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  @Input() displayedColumns: Array<string>;
  @Input() rank: string;

  symbol: String;
  limit: Number;
  bids: Array<String>;
  asks: Array<String>;
  isLoadingResults: Boolean = false;
  refreshInterval: number;

  loadDataSubs: any;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(private db: DbService) {
    this.limit = 5;
    this.refreshInterval = 60000;
  }

  ngOnInit() {
    this.isLoadingResults = true;
    this.loadData();
  }

  ngOnDestroy() {
    // this.api.getCoinStats().unsubscribe();
  }

  byPrice(data) {
    const sorted = data.sort((a, b) => {
      const first = parseFloat(a.priceChangePercent);
      const second = parseFloat(b.priceChangePercent);
      if (first < second) {
        return 1
      } else {
        return -1
      }
    })
    return sorted;
  }
  byVolume(data) {
    const sorted = data.sort((a, b) => {
      const first = parseInt(a.quoteVolume);
      const second = parseInt(b.quoteVolume);
      if (first < second) {
        return 1
      } else {
        return -1
      }
    });
    return sorted;
  }
  renderData(data) {
    if (this.rank === 'winners') {
      this.dataSource.data = this.byPrice(data);
    } else {
      this.dataSource.data = this.byVolume(data);
    }
  }

  loadData() {
    this.loadDataSubs = interval(this.refreshInterval).pipe(startWith(0), mergeMap(() => {
      return this.db.getCoinStats();
    }));

    this.loadDataSubs.subscribe(orders => {
      this.renderData(orders);
      this.isLoadingResults = false;
    });
  }
}
