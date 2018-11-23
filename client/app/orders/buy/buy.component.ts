import { Component, OnInit } from '@angular/core';
import { BuyOptions } from 'client/app/models/components';
import { DbService } from 'client/app/services/db.service';

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
  constructor(private db: DbService) { }

  ngOnInit() {
    // this.db.getBookOrder()
  }

}
