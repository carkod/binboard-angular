import { Component, OnInit, SimpleChanges } from '@angular/core';
import { BuyOptions, NewOrder, TimeInForce } from 'client/app/models/components';
import { DbService } from 'client/app/services/db.service';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { mergeMap, concatMap, map, switchMap, mergeAll, combineLatest, mapTo } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/internal/Observable';
import { forkJoin, concat, merge, zip } from 'rxjs';

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
  symbol: string;
  newOrder: NewOrder = {
    symbol: null,
    price: null,
    quantity: null,
    type: null,
    side: 'BUY',
  };

  total: Number = 0;
  price: Number = 0;;
  quantity: Number = 0;;

  constructor(private db: DbService, private snackBar: MatSnackBar) {
    this.buildForm();
  }

  ngOnInit() {
    // this.db.getBookOrder()
    this.buyForm.get('orderType').valueChanges.subscribe(orderType => {
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
    });

    this.buyForm.get('price').valueChanges.subscribe(price => this.price = price);
    this.buyForm.get('quantity').valueChanges.subscribe(quantity => this.quantity = quantity);;
  }

  ngOnChanges(c) {
    console.log(c);
  }

  buildForm() {
    this.buyForm = new FormGroup({
      symbol: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      orderType: new FormControl('LIMIT', Validators.required),
      quantity: new FormControl(null, Validators.required),
      timeInForce: new FormControl(null),
      stopPrice: new FormControl({value: null, disabled: true}),
    });
  }

  onSubmit() {
    if (this.buyForm.valid) {
      const { symbol, price, orderType, quantity, timeInForce, stopPrice } = this.buyForm.value;
      const side = 'BUY';
      this.db.newOrder(symbol, side, orderType, quantity, price, timeInForce, stopPrice ).subscribe(result => {
        // Handle errors in interceptor
        console.log(result);
      })
    } else {
      console.log('form invalid', this.buyForm)
      this.snackBar.open('Invalid form fields, cannot be submitted', 'close', { duration: 3000 });
    }
  }

}
