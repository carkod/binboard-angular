import { Component, OnInit } from '@angular/core';
import { BuyOptions } from 'client/app/models/components';

@Component({
  selector: 'buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  options: BuyOptions[] = [
    {value: 'limit', viewValue: 'Limit order'},
    {value: 'market', viewValue: 'Market order'},
    {value: 'stop', viewValue: 'Stop-Limit'}
  ]
  constructor() { }

  ngOnInit() {
  }

}
