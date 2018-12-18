import { Component, OnInit } from '@angular/core';
import { DbService } from 'client/app/services/db.service';

@Component({
  selector: 'order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.scss']
})
export class OrderHistoryComponent implements OnInit {

  orders: Array<String>;
  isLoadingResults: Boolean = false;
  noOpenOrders: Boolean = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  openOrdersColumns = ['price', 'quantity'];

  constructor(private db: DbService) { }

  ngOnInit() {
    this.isLoadingResults = true;
    this.loadData();
  }
  loadData() {
    this.db.getAllOrders().subscribe(res => {
      console.log(res);
    })
    // Update with db api structure
    // this.db.getAllOrders().subscribe((orders: any) => {
    //   const parseData = JSON.parse(orders);
    //   if (parseData.length === 0) {
    //     this.noOpenOrders = true;
    //   } else {
    //     this.noOpenOrders = false;
    //   }
    //   this.isLoadingResults = false;
    // });
  }

}
