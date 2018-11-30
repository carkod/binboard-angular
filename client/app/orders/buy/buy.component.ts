import { Component, OnInit } from '@angular/core';
import { BuyOptions, NewOrder, TimeInForce } from 'client/app/models/components';
import { DbService } from 'client/app/services/db.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  options: BuyOptions[] = [
    { value: 'LIMIT', viewValue: 'Limit order' },
    { value: 'MARKET', viewValue: 'Market order' },
    { value: 'STOP_LOSS', viewValue: 'Stop-Loss' },
    { value: 'STOP_LOSS_LIMIT', viewValue: 'Stop-Limit' },
    { value: 'TAKE_PROFIT', viewValue: 'Take profit order' },
    { value: 'TAKE_PROFIT_LIMIT', viewValue: 'Take profit limit' },
    { value: 'LIMIT_MAKER', viewValue: 'Stop-Loss' }
  ]

  timeInForceOptions: TimeInForce[] = [
    { value: 'GTC', viewValue: 'Good Till Cancel' },
    { value: 'IOC', viewValue: 'Immediate Or Cancel' },
    { value: 'FOK', viewValue: 'Fill Or Kill' },
  ]

  buyForm: FormGroup;
  symbol: String;
  total: Number = 0;
  price: Number = 0;;
  quantity: Number = 0;;

  constructor(private db: DbService, private snackBar: MatSnackBar) {
    this.buildForm();
  }

  ngOnInit() {
    this.symbol = 'ONTETH';
    this.buyForm.get('orderType').valueChanges.subscribe(orderType => this.dynamicFields(orderType));
    this.buyForm.get('price').valueChanges.subscribe(price => this.price = price);
    this.buyForm.get('quantity').valueChanges.subscribe(quantity => this.quantity = quantity);
    this.buyForm.get('symbol').valueChanges.subscribe(symbol => this.symbol = symbol);
  } 

  dynamicFields(orderType: String) {
    // If it is a limit order turn on Time in force
    if (orderType.indexOf('LIMIT') === 0) {
      this.buyForm.get('timeInForce').enable();
    } else {
      this.buyForm.get('timeInForce').disable();
    }

    // If stop loss or take profit turn on stop price
    if (orderType.indexOf('STOP_LOSS') === 0 || orderType.indexOf('TAKE_PROFIT') === 0) {
      this.buyForm.get('stopPrice').enable();
    } else {
      this.buyForm.get('stopPrice').disable();
    }
  }

  buildForm() {
    this.buyForm = new FormGroup({
      symbol: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      orderType: new FormControl('LIMIT', Validators.required),
      quantity: new FormControl(null, Validators.required),
      timeInForce: new FormControl('GTC'),
      stopPrice: new FormControl({ value: null, disabled: true }),
    });
  }

  onSubmit() {
    if (this.buyForm.valid) {
      const { symbol, price, orderType, quantity, timeInForce, stopPrice } = this.buyForm.value;
      const side = 'BUY';
      this.db.newOrder(symbol, side, orderType, quantity, price, timeInForce, stopPrice).subscribe(result => {
        // Handle errors in interceptor
        console.log(result);
      })
    } else {
      console.log('form invalid', this.buyForm)
      this.snackBar.open('Invalid form fields, cannot be submitted', 'close');
    }
  }

}
