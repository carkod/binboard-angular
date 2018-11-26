import { Component, OnInit } from '@angular/core';
import { BuyOptions } from 'client/app/models/components';
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
    { value: 'limit', viewValue: 'Limit order' },
    { value: 'market', viewValue: 'Market order' },
    { value: 'stop', viewValue: 'Stop-Limit' }
  ]

  buyForm: FormGroup;
  symbol: string;

  constructor(private db: DbService, private fb: FormBuilder, private snackBar: MatSnackBar) { 
    this.buyForm = this.fb.group({
      symbol: [null, Validators.required],
      price: [null, Validators.required],
      number: [null, Validators.required],
      quantity: [null, Validators.required],
    });
  }

  ngOnInit() {  
    
    // this.db.getBookOrder()
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.buyForm.value);
    const {symbol} = this.buyForm.value;
    if (this.buyForm.valid) {
      this.db.getSingleCoinStats(symbol).pipe(mergeMap(stats => this.db.postNewCoin(stats))).subscribe(result => {
          if (result) {
            this.snackBar.open('Added ' + symbol + ' to Tracking list', 'close', { duration: 3000 });
          }
        },
        error => {
          if (error.status === 500) {
            this.snackBar.open('Coin Already exists', 'close', { duration: 3000 });
          }
      })
    } else {
      console.log('form invalid')
    }
  }

}
