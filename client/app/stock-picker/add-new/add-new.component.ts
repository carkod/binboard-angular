import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { DbService } from '../../services/db.service';
import { mergeMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  @Output() addSymbol: EventEmitter<object> = new EventEmitter();
  options: FormGroup;

  constructor(public snackBar: MatSnackBar, private db: DbService, fb: FormBuilder) {
    this.options = fb.group({
      // hideRequired: false,
      // floatLabel: 'auto',
      symbol: ['', Validators.required],
      // interval:'30m',
      // limit: '50',
    });
  }
  ngOnInit() {


  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.options.value);
    const {symbol} = this.options.value;
    if (this.options.valid) {
      this.db.getSingleCoinStats(symbol).pipe(mergeMap(stats => this.db.postNewCoin(stats))).subscribe(result => {
          if (result) {
            this.addSymbol.emit(symbol)
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
