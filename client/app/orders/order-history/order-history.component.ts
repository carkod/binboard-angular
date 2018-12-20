import { Component, OnInit } from '@angular/core';
import { DbService } from 'client/app/services/db.service';
import { OrderHistory } from 'client/app/models/components';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: Array<String>;
  isLoadingResults: Boolean = false;
  history: Array<OrderHistory> = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  openOrdersColumns = ['updated', 'pair', 'type', 'side', 'price', 'filled', 'amount', 'total', 'status'];

  constructor(private db: DbService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.loadData();
  }
  loadData() {
    this.db.getAllOrders().subscribe((res: Array<any>) => {
      this.isLoadingResults = false;
      this.history = res.map(x => {
        return {
          orderId: x.orderId,
          id: x.id,
          createdAt: x.time,
          updatedAt: x.updateTime,
          pair: x.symbol,
          type: x.type,
          side: x.side,
          average: '-',
          price: x.price,
          filled: x.executedQty,
          amount: x.origQty,
          total: x.cummulativeQuoteQty || 'N/A',
          trigger: '-',
          status: x.status
        }
      });
    })
  }
}
