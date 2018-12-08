import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  symbol: String; // Default symbol (from balance service)
  recvWindow: Number; // Default window
  bidAskLimit: Number = 5; // Default bid ask table
  baseCoin: String = 'BTC'; // Default exchange coin for platform
  decimalPoints: Number = 5;
  
  constructor() { }

  ngOnInit() {
  }

}
