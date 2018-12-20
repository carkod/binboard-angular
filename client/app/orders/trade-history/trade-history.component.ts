import { Component, OnInit } from '@angular/core';
import { DbService } from 'client/app/services/db.service';
import { TradesHistory } from 'client/app/models/components';

@Component({
  selector: 'trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.scss']
})
export class TradeHistoryComponent implements OnInit {

  orders: Array<String>;
  isLoadingResults: Boolean = false;
  history: Array<TradesHistory> = [];
  tradeHistoryColumns = ['time', 'pair', 'type', 'fee','price', 'filled',  'total'];
  constructor(private db: DbService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.loadData();
  }

  loadData() {
    this.db.getTradesHistory().subscribe((res: Array<any>) => {
      this.isLoadingResults = false;
      this.history = res.map(x => {
        return {
          id: x.id,
          orderId: x.orderId,
          time: x.time,
          pair: x.symbol,
          type: '-',
          price: x.price,
          fee: x.commission,
          filled: '-',
          qty: x.qty,
          total: this.getTotal(x.price, x.qty),
        }
      });
    })
  }

  getTotal(price, qty) {
    price = parseFloat(price);
    qty = parseFloat(qty);
    const result = price * qty;
    return result.toString();
  }
}
