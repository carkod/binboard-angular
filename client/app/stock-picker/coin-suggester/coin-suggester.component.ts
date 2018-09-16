import { Component, OnInit, forwardRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '../../../../node_modules/@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import { startWith, map } from '../../../../node_modules/rxjs/operators';
import { DbService } from '../../services/db.service';

export interface Ticker { symbol: string, price: string }

@Component({
  selector: 'coin-suggester',
  templateUrl: './coin-suggester.component.html',
  styleUrls: ['./coin-suggester.component.scss'],
  providers: [
    { 
      provide: NG_VALUE_ACCESSOR,
      useExisting: CoinSuggesterComponent,
      multi: true
    }
  ]
})
export class CoinSuggesterComponent implements ControlValueAccessor {

  myControl = new FormControl();
  options: Ticker[];
  filteredOptions: Observable<Ticker[]>;

  constructor(private db: DbService) { 
    this.db.getTicker().subscribe(coinData => {
      coinData = JSON.parse(coinData);
      this.options = coinData;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Ticker>(''),
        map(value => typeof value === 'string' ? value : value.symbol),
        map(symbol => symbol ? this._filter(symbol) : this.options.slice())
      );
    });
  }

  displayFn(coin?: Ticker): string | undefined {
    // this.propagateChange(coin);
    // console.log(coin)
    return coin ? coin.symbol : undefined;
  }

  private _filter(name: string): Ticker[] {
    const filterValue = name.toLowerCase();
    const value = this.options.filter(option => option.symbol.toLowerCase().indexOf(filterValue) === 0);
    this.propagateChange(value[0].symbol);
    return value;
  }
  
  writeValue(value): void {
  }
  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(value) {
    // console.log(value)
  }
}
