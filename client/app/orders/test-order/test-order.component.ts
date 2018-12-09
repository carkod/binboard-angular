import { Component, OnInit } from '@angular/core';
import { DbService } from 'client/app/services/db.service';
import { IMatOptions } from 'client/app/models/components';
import { ORDER_TYPES, TIME_IN_FORCE, SIDES } from 'client/app/models/static';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BalanceService } from 'client/app/services/balance.service';

@Component({
  selector: 'test-order',
  templateUrl: './test-order.component.html',
  styleUrls: ['./test-order.component.scss']
})
export class TestOrderComponent implements OnInit {

  options: IMatOptions[] = ORDER_TYPES;
  timeInForceOptions: IMatOptions[] = TIME_IN_FORCE;
  sideOptions: Array<IMatOptions> = SIDES;

  testOrderForm: FormGroup;
  symbol: String;
  total: Number = 0;
  price: Number = 0;;
  quantity: Number = 0;
  recvWindow: number = 50000;
  side: String;

  constructor(private db: DbService, private snackBar: MatSnackBar, private balances: BalanceService) {
    this.getDefaultSymbol();
  }

  ngOnInit() {
    this.buildForm();
    this.testOrderForm.get('side').valueChanges.subscribe(side => this.side = side );
    this.testOrderForm.get('orderType').valueChanges.subscribe(orderType => this.dynamicFields(orderType));
    this.testOrderForm.get('price').valueChanges.subscribe(price => this.price = price);
    this.testOrderForm.get('quantity').valueChanges.subscribe(quantity => this.quantity = quantity);
    this.testOrderForm.get('symbol').valueChanges.subscribe(symbol => this.symbol = symbol);
  }

  dynamicFields(orderType: String) {
    // If it is a limit order turn on Time in force
    if (orderType.indexOf('LIMIT') === 0) {
      this.testOrderForm.get('timeInForce').enable();
    } else {
      this.testOrderForm.get('timeInForce').disable();
    }

    // If stop loss or take profit turn on stop price
    if (orderType.indexOf('STOP_LOSS') === 0 || orderType.indexOf('TAKE_PROFIT') === 0) {
      this.testOrderForm.get('stopPrice').enable();
    } else {
      this.testOrderForm.get('stopPrice').disable();
    }

    // If market order no price
    if (orderType === 'MARKET') {
      this.testOrderForm.get('price').disable();
    } else {
      this.testOrderForm.get('price').enable();
    }
  }

  buildForm() {
    this.testOrderForm = new FormGroup({
      side: new FormControl('', Validators.required),
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
    if (this.testOrderForm.valid) {
      const { symbol, price, orderType, quantity, timeInForce, stopPrice, side } = this.testOrderForm.value;
      this.db.testOrder(symbol, side, orderType, quantity, price, timeInForce, stopPrice, this.recvWindow).subscribe(res => {
        console.log('test order result ', res);
      })
    } else {
      console.log('form invalid', this.testOrderForm)
      this.snackBar.open('Invalid form fields, cannot be submitted', 'close');
    }
  }

}
