import { Component, OnInit } from '@angular/core';
import { IMatOptions } from 'client/app/models/components';
import { DbService } from 'client/app/services/db.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TIME_IN_FORCE, ORDER_TYPES } from 'client/app/models/static';
import { BalanceService } from 'client/app/services/balance.service';


@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  options: IMatOptions[] = ORDER_TYPES;
  timeInForceOptions: IMatOptions[] = TIME_IN_FORCE;

  sellForm: FormGroup;
  symbol: String;
  total: Number = 0;
  price: Number = 0;;
  quantity: Number = 0;;

  constructor(private db: DbService, private snackBar: MatSnackBar, private balances: BalanceService) {
    this.getDefaultSymbol();
  }

  ngOnInit() {
    this.buildForm(); 
    this.sellForm.get('orderType').valueChanges.subscribe(orderType => this.dynamicFields(orderType));
    this.sellForm.get('price').valueChanges.subscribe(price => this.price = price);
    this.sellForm.get('quantity').valueChanges.subscribe(quantity => this.quantity = quantity);
    this.sellForm.get('symbol').valueChanges.subscribe(symbol => this.symbol = symbol);
  } 

  dynamicFields(orderType: String) {
    // If it is a limit order turn on Time in force
    if (orderType.indexOf('LIMIT') === 0) {
      this.sellForm.get('timeInForce').enable();
    } else {
      this.sellForm.get('timeInForce').disable();
    }

    // If stop loss or take profit turn on stop price
    if (orderType.indexOf('STOP_LOSS') === 0 || orderType.indexOf('TAKE_PROFIT') === 0) {
      this.sellForm.get('stopPrice').enable();
    } else {
      this.sellForm.get('stopPrice').disable();
    }
    // If market order no price
    if (orderType === 'MARKET') {
      this.sellForm.get('price').disable();
    } else {
      this.sellForm.get('price').enable();
    }
  }

  buildForm() {
    this.sellForm = new FormGroup({
      symbol: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      orderType: new FormControl('LIMIT', Validators.required),
      quantity: new FormControl(null, Validators.required),
      timeInForce: new FormControl('GTC'),
      stopPrice: new FormControl({ value: null, disabled: true }),
    });
  }
  getDefaultSymbol () {
    this.balances.getTotalBalance().then(balance => {
      const quoteAssets = balance;
      this.balances.getAllQuoteAssets().then(quote => {
        const firstAsset = quoteAssets.find(x => !quote.includes(x.asset));
        this.symbol = firstAsset.symbol;
      })
    });
  }

  onSubmit() {
    if (this.sellForm.valid) {
      const { symbol, price, orderType, quantity, timeInForce, stopPrice } = this.sellForm.value;
      const side = 'SELL';
      this.db.newOrder(symbol, side, orderType, quantity, price, timeInForce, stopPrice).subscribe(result => {
        // Handle errors in interceptor
        console.log(result);
      })
    } else {
      console.log('form invalid', this.sellForm)
      this.snackBar.open('Invalid form fields, cannot be submitted', 'close');
    }
  }

}
