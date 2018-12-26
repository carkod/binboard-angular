import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  symbol: String;
  isLoadingResults: Boolean;

  constructor() { 
    if (this.symbol === undefined) {
      this.isLoadingResults = true;
    }
  }

  ngOnInit() {
  }

  updateSymbol(symbol: String) {
    this.symbol = symbol;
    this.isLoadingResults = false
  }

}
