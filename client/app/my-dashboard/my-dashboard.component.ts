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
  totalBalance: String;

  constructor(private snackbar: MatSnackBar, private balance: BalanceService, private db: DbService) {}

  ngOnInit() {
    this.balance.getBtcAmout().then(data => {
      this.totalBalance = data + ' BTC';
    })
  }

  clearLocal() {
    localStorage.removeItem('getCoinStats');
    this.snackbar.open('Local Coin data removed!', 'Undo', {
      duration: 3000
    });
  }
}
