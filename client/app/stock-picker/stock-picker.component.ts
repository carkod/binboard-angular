import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.scss']
})
export class StockPickerComponent implements OnInit {

  newCoin: object;

  constructor() { }

  ngOnInit() {
    
  }
  getNewCoin(event) {
    this.newCoin = event;
  }
}
