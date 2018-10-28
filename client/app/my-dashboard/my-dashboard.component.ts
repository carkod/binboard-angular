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
  

  constructor(private snackbar: MatSnackBar, private api: ApiService, private db: DbService) {}

  ngOnInit() {
    let timestamp = +new Date;
    let recvWindow = 5000;
    this.db.getServerTime().subscribe(serverTime => {
      this.db.getAccount(timestamp, recvWindow).subscribe(data => {
        console.log('account', data)
      })
      // if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow) {
      //   console.log('request processed');
      //   this.api.getAccount(timestamp, recvWindow).subscribe(data => {
      //     console.log('account', data)
      //   })
        
      // } else {
      //   console.log('recvWindow delay, request not processed');
      // }
    })
  }

  clearLocal() {
    localStorage.removeItem('getCoinStats');
    this.snackbar.open('Local Coin data removed!', 'Undo', {
      duration: 3000
    });
  }
}
