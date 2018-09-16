import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { SymbolPriceTicker } from '../../models/services';


/**
 * Data source for the RankingTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class RankingTableDataSource extends DataSource<SymbolPriceTicker> {
  data: SymbolPriceTicker[];
  api: ApiService;

  constructor(private paginator: MatPaginator, private sort: MatSort) {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<any> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    
    const dataMutations = [
      observableOf(this.api.getCoinStats()),
      this.paginator.page,
      this.sort.sortChange
    ];
    return merge(...dataMutations).pipe(map((d) => {
      this.paginator.length = this.data.length;
      return this.getPagedData(this.getSortedData([...this.data]));
    }))

  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {
    this.api.getCoins().unsubscribe();
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: SymbolPriceTicker[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: SymbolPriceTicker[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'symbol': return compare(a.symbol, b.symbol, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
