import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { DbService } from 'client/app/services/db.service';
import { parse } from 'url';

@Component({
  selector: 'open-orders',
  templateUrl: './open-orders.component.html',
  styleUrls: ['./open-orders.component.scss']
})
export class OpenOrdersComponent implements OnInit {

  orders: Array<String>;
  isLoadingResults: Boolean = false;
  noOpenOrders: Boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  openOrdersColumns = ['price', 'quantity'];

  constructor(
    private db: DbService,
  ) {}

  ngOnInit() {
    this.isLoadingResults = true;
    this.loadData();
  }

  loadData() {
    this.db.getOpenOrders().subscribe((orders: any) => {
      const parseData = JSON.parse(orders);
      if (parseData.length === 0) {
        this.noOpenOrders = true;
      } else {
        this.noOpenOrders = false;
      }
      this.isLoadingResults = false;
    });
  }

}
