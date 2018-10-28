import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource, MatSnackBar } from '../../../node_modules/@angular/material';
import { SymbolPriceTicker } from '../models/services';
import { DbService } from '../services/db.service';

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],

  
})
export class MyDashboardComponent implements OnInit{
  pageElements: Array<any>;
  dataSource: MatTableDataSource<SymbolPriceTicker>;
  accountData;
  serverTime: number;
  

  constructor(private snackbar: MatSnackBar, private db: DbService) {}

  ngOnInit() {
    let timestamp = +new Date;
    let recvWindow = 20000;
    this.db.getServerTime().subscribe(serverTime => {
      this.serverTime = +JSON.parse(serverTime).serverTime;
      console.log(timestamp, this.serverTime, recvWindow);
      if (timestamp < (this.serverTime + 1000) && (this.serverTime - timestamp) <= recvWindow) {
        this.db.getAccount(timestamp, recvWindow).subscribe(data => {
          this.accountData = JSON.parse(data);
          console.log('account', this.accountData)
        })
        
      } else {
        console.log('recvWindow delay, request not processed');
      }
    })
  }

  clearLocal() {
    localStorage.removeItem('getCoinStats');
    this.snackbar.open('Local Coin data removed!', 'Undo', {
      duration: 3000
    });
  }
}
