import { Component, OnInit } from '@angular/core';
import { OrderTypes, NewOrder, TimeInForce } from 'client/app/models/components';
import { DbService } from 'client/app/services/db.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TIME_IN_FORCE, ORDER_TYPES } from 'client/app/models/static';


@Component({
  selector: 'ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.scss']
})
export class AskComponent implements OnInit {

  options: OrderTypes[] = ORDER_TYPES;
  timeInForceOptions: TimeInForce[] = TIME_IN_FORCE;

  askForm: FormGroup;
  symbol: String;
  total: Number = 0;
  price: Number = 0;;
  quantity: Number = 0;;

  constructor(private db: DbService, private snackBar: MatSnackBar) {
    this.buildForm();
  }

  ngOnInit() {
    this.symbol = 'ONTETH';
    this.askForm.get('orderType').valueChanges.subscribe(orderType => this.dynamicFields(orderType));
    this.askForm.get('price').valueChanges.subscribe(price => this.price = price);
    this.askForm.get('quantity').valueChanges.subscribe(quantity => this.quantity = quantity);
    this.askForm.get('symbol').valueChanges.subscribe(symbol => this.symbol = symbol);
  } 

  dynamicFields(orderType: String) {
    // If it is a limit order turn on Time in force
    if (orderType.indexOf('LIMIT') === 0) {
      this.askForm.get('timeInForce').enable();
    } else {
      this.askForm.get('timeInForce').disable();
    }

    // If stop loss or take profit turn on stop price
    if (orderType.indexOf('STOP_LOSS') === 0 || orderType.indexOf('TAKE_PROFIT') === 0) {
      this.askForm.get('stopPrice').enable();
    } else {
      this.askForm.get('stopPrice').disable();
    }
  }

  buildForm() {
    this.askForm = new FormGroup({
      symbol: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      orderType: new FormControl('LIMIT', Validators.required),
      quantity: new FormControl(null, Validators.required),
      timeInForce: new FormControl('GTC'),
      stopPrice: new FormControl({ value: null, disabled: true }),
    });
  }

  onSubmit() {
    if (this.askForm.valid) {
      const { symbol, price, orderType, quantity, timeInForce, stopPrice } = this.askForm.value;
      const side = 'SELL';
      this.db.newOrder(symbol, side, orderType, quantity, price, timeInForce, stopPrice).subscribe(result => {
        // Handle errors in interceptor
        console.log(result);
      })
    } else {
      console.log('form invalid', this.askForm)
      this.snackBar.open('Invalid form fields, cannot be submitted', 'close');
    }
  }

}
