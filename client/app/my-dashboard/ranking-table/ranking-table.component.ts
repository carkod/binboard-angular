import { Component, OnInit, ViewChild, AfterViewInit, Input, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
// import { RankingTableDataSource } from './ranking-table-datasource';
import { ApiService } from '../../services/api.service';
import { DbService } from '../../services/db.service';

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

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(private db: DbService) {

  }

  ngOnInit() {
    this.db.getCoinStats().subscribe(data => {
      this.renderData(data);
    })
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
}
