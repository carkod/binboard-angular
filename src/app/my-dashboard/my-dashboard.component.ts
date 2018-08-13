import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService, SymbolPriceTicker } from '../api.service';
import { MatTableDataSource } from '../../../node_modules/@angular/material';

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],

  
})
export class MyDashboardComponent implements OnInit, OnDestroy{
  pageElements: Array<any>;
  dataSource: MatTableDataSource<SymbolPriceTicker>;
  

  constructor(private api: ApiService) {}
  ngOnInit() {
    
  }

  ngOnDestroy() {

  }
  displayStream() {
    
  }
}
