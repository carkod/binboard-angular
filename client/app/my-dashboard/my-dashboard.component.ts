import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource, MatSnackBar } from '../../../node_modules/@angular/material';
import { SymbolPriceTicker } from '../models/services';
import { DbService } from '../services/db.service';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],

  
})
export class MyDashboardComponent implements OnInit{
  pageElements: Array<any>;
  dataSource: MatTableDataSource<SymbolPriceTicker>;

  constructor(private snackbar: MatSnackBar, private balance: BalanceService, private db: DbService) {}

  ngOnInit() {
    // this.balance.loadData().subscribe(res => {
    //   // console.log(res);
    // });
    // this.balance.getBaseAssets().subscribe(quote => {
    //   // console.log(quote);
    // })
    // this.db.getMyTrades('BNBETH').subscribe(trades => {
    //   console.log(trades);
    // });
    this.db.getOpenOrders('BNBETH', 20000).subscribe(orders => {
      console.log(orders);
    })
  }

  clearLocal() {
    localStorage.removeItem('getCoinStats');
    this.snackbar.open('Local Coin data removed!', 'Undo', {
      duration: 3000
    });
  }
}
