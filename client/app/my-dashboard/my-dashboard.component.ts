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
  totalBalance: Number = 0;
  euroPrice: Number;
  totalEuros: Number = 0;

  constructor(private snackbar: MatSnackBar, private balance: BalanceService, private db: DbService) {}

  ngOnInit() {
    this.loadBalanceAmount();
  }

  private loadBalanceAmount() {
    this.balance.getBtcAmout().then(data => {
      this.totalBalance = +data;
    });
    this.balance.getEurAmount().then(res => {
      this.euroPrice = +res.BTCEUR.last;
      this.totalEuros = +this.totalBalance * +this.euroPrice;
      this.totalEuros = +this.totalEuros.toFixed(2);
    })
  }

  clearLocal() {
    localStorage.removeItem('getCoinStats');
    this.snackbar.open('Local Coin data removed!', 'Undo', {
      duration: 3000
    });
  }
}
