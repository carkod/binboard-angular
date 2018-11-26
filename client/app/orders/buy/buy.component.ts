import { Component, OnInit } from '@angular/core';
import { BuyOptions, NewOrder } from 'client/app/models/components';
import { DbService } from 'client/app/services/db.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { mergeMap } from 'rxjs/operators';
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

  buyForm: FormGroup;
  symbol: string;
  newOrder: NewOrder = {
    symbol: null,
    price: null,
    quantity: null,
    type: null,
    side: 'BUY',
  };

  constructor(private db: DbService, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.buyForm = this.fb.group({
      symbol: [null, Validators.required],
      price: [null, Validators.required],
      orderType: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  ngOnInit() {

    // this.db.getBookOrder()
  }

  onSubmit() {
    if (this.buyForm.valid) {
      const { symbol, price, orderType, quantity } = this.buyForm.value;
      const side = 'BUY';
      this.db.newOrder(symbol, side, orderType, quantity, price).subscribe(result => {
          if (result) {
            this.snackBar.open('Successfully sent order', 'close', { duration: 3000 });
          }
        },
        error => {
          if (error.status === 500) {
            console.log(error)
            // this.snackBar.open('Coin Already exists', 'close', { duration: 3000 });
          }
      })
    } else {
      console.log('form invalid', this.buyForm)
    }
  }

}
