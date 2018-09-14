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
export class RankingTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();

  @Input() displayedColumns: Array<string>;
  @Input() rank: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */

  constructor(private api: ApiService, private db: DbService) {

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  ngOnInit() {
    /**
     * Dataset is too large, convert to JSON and store in Web Local Storage
     */
    const localData = JSON.parse(localStorage.getItem('getCoinStats'));
    if (!localData) {
      this.db.getCoinStats().subscribe(data => {
        localStorage.setItem('getCoinStats', JSON.stringify(data));
        this.renderData(data);
      })
    } else {
      this.renderData(localData);
    }
    setInterval(localStorage.removeItem('getCoinStats'), 1800000);

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
      const first = parseInt(a.volume);
      const second = parseInt(b.volume);
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
