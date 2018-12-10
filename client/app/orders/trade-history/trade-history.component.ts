import { Component, OnInit } from '@angular/core';
import { DbService } from 'client/app/services/db.service';
import { BalanceService } from 'client/app/services/balance.service';

@Component({
  selector: 'trade-history',
  templateUrl: './trade-history.component.html',
  styleUrls: ['./trade-history.component.scss']
})
export class TradeHistoryComponent implements OnInit {

  constructor(private db: DbService, private balance: BalanceService) { }

  ngOnInit() {
  }

  loadData() {
    // First get all symbols in account
    this.balance.getAccount().then(data => {
      console.log(data);
    })  
  }
}
