import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { DbService } from '../../services/db.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {
  @Output() addSymbol: EventEmitter<object> = new EventEmitter();
  options: FormGroup;

  constructor(private api: DbService, fb: FormBuilder) {
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
      this.api.getSingleCoinStats(symbol).pipe(mergeMap(stats => this.api.postNewCoin(stats))).subscribe(result => {
          this.addSymbol.emit(result);
        },
        error => {
          throw error
      })
    } else {
      console.log('form invalid')
    }
  }
}
