import { Component, OnInit } from '@angular/core';
import { ApiService, SymbolPriceTicker } from '../services/api.service';
import { MatTableDataSource, MatSnackBar } from '../../../node_modules/@angular/material';

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
    
  }
  clearLocal() {
    localStorage.removeItem('getCoinStats');
    this.snackbar.open('Local Coin data removed!', 'Undo', {
      duration: 3000
    });
  }
}
