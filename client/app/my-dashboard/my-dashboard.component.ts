import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { MatTableDataSource, MatSnackBar } from '../../../node_modules/@angular/material';
import { SymbolPriceTicker } from '../models/services';

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],

  
})
export class MyDashboardComponent implements OnInit{
  pageElements: Array<any>;
  dataSource: MatTableDataSource<SymbolPriceTicker>;
  

  constructor(private snackbar: MatSnackBar, private api: ApiService) {}

  ngOnInit() {
    let timestamp = new Date().getMilliseconds();
    let recvWindow = 5000;
    this.api.getServerTime().subscribe(serverTime => {
      if (timestamp < (serverTime + 1000) && (serverTime - timestamp) <= recvWindow) {
        console.log('request processed');
        this.api.getAccount(timestamp, recvWindow).subscribe(data => {

        })
        
      } else {
        console.log('recvWindow delay, request not processed');
      }
    })
    // this.api.getAccount().subscribe(data => {
    //   console.log(data);
    // })
  }

  clearLocal() {
    localStorage.removeItem('getCoinStats');
    this.snackbar.open('Local Coin data removed!', 'Undo', {
      duration: 3000
    });
  }
}
