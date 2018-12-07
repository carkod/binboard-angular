import { Component, OnInit } from '@angular/core';
import { OrderTypes, TimeInForce } from 'client/app/models/components';
import { DbService } from 'client/app/services/db.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TIME_IN_FORCE, ORDER_TYPES } from 'client/app/models/static';
import { BalanceService } from 'client/app/services/balance.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss']
})
export class BuyComponent implements OnInit {

  options: OrderTypes[] = ORDER_TYPES;
  timeInForceOptions: TimeInForce[] = TIME_IN_FORCE;

  buyForm: FormGroup;
  symbol: String;
  total: Number = 0;
  price: Number = 0;;
  quantity: Number = 0;
  recvWindow: Number = 50000;

  constructor(private db: DbService, private snackBar: MatSnackBar, private balances: BalanceService) {
    this.getDefaultSymbol();
  }

  ngOnInit() {
    this.buildForm();
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

    // If market order no price
    if (orderType === 'MARKET') {
      this.buyForm.get('price').disable();
    } else {
      this.buyForm.get('price').enable();
    }
  }

  buildForm() {
    this.buyForm = new FormGroup({
      symbol: new FormControl('', Validators.required),
      price: new FormControl(null, Validators.required),
      orderType: new FormControl('LIMIT', Validators.required),
      quantity: new FormControl(null, Validators.required),
      timeInForce: new FormControl('GTC'),
      stopPrice: new FormControl({ value: null, disabled: true }),
    });
  }

  getDefaultSymbol() {
    this.balances.getTotalBalance().then(balance => {
      const quoteAssets = balance;
      this.balances.getAllQuoteAssets().then(quote => {
        const firstAsset = quoteAssets.find(x => !quote.includes(x.asset));
        this.symbol = firstAsset.symbol;
      })
    });
  }

  onSubmit() {
    if (this.buyForm.valid) {
      const { symbol, price, orderType, quantity, timeInForce, stopPrice } = this.buyForm.value;
      const side = 'BUY';
      this.db.newOrder(symbol, side, orderType, quantity, price, timeInForce, stopPrice, revWindow).subscribe(result => {
        // Handle errors in interceptor
        console.log(result);
      })
    } else {
      console.log('form invalid', this.buyForm)
      this.snackBar.open('Invalid form fields, cannot be submitted', 'close');
    }
  }

}
