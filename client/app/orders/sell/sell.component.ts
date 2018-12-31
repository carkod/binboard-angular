import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMatOptions } from 'client/app/models/components';
import { DbService } from 'client/app/services/db.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TIME_IN_FORCE, ORDER_TYPES } from 'client/app/models/static';
import { BalanceService } from 'client/app/services/balance.service';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent implements OnInit {

  @Output() updateData: EventEmitter<Object> = new EventEmitter();
  @Output() updateSymbol: EventEmitter<String> =  new EventEmitter();

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
    this.sellForm.get('symbol').valueChanges.pipe(debounceTime(5000)).subscribe(symbol => {
      this.symbol = symbol;
      this.updateSymbol.emit(symbol);
      this.defaultPrice(symbol);
    });
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
    if (this.sellForm.valid) {
      const { symbol, price, orderType, quantity, timeInForce, stopPrice } = this.sellForm.value;
      const side = 'SELL';
      this.db.newOrder(symbol, side, orderType, quantity, price, timeInForce, stopPrice).subscribe((result: string) => {
        const { symbol, status, side, orderId } = JSON.parse(result);
        if (status) {
        this.updateData.emit(JSON.parse(result))
        this.snackBar.open(`${status} order created`, 'close');  
        }
      })
    } else {
      this.snackBar.open('Invalid form fields, cannot be submitted', 'close');
    }
  }

  /**
 * Get price using ticker endpoint
 * @param symbol {string} set default price GIVEN symbol (coin-suggester component)
 */
  defaultPrice(symbol) {
    this.db.getTicker(symbol).subscribe(res => {
      const { price } = JSON.parse(res);
      this.sellForm.get('price').setValue(price)
      this.maxQty(price);
    })
  }

  async maxQty(price: String) {
    const balance = await this.balances.getAccount();
    const baseAssets = await this.balances.getAllQuoteAssets();
    // Find this base asset in existent Funds
    const matchBalance = balance.find(x => {
      // If asset is found in funds && not in the list of base assets (not a ETH, BTC, BNB, USDT...)
      if (this.symbol.indexOf(x.asset) > -1 && baseAssets.indexOf(x.asset) === -1) {
        return x.free
      }
      return null
    });
    if (matchBalance) {
      // Sell available funds of quote Asset
      this.sellForm.get('quantity').setValue(matchBalance.free)
    }
    return null

  }

}
