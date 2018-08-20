import { Component, OnInit, forwardRef } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '../../../../node_modules/@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import { startWith, map } from '../../../../node_modules/rxjs/operators';

export interface Ticker {
  symbol: string, price: string
}

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

  constructor(private api: ApiService) { 
    this.api.getCoins(100).subscribe(coinData => {
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
    console.log(coin)
    return coin ? coin.symbol : undefined;
  }

  private _filter(name: string): Ticker[] {
    const filterValue = name.toLowerCase();
    this.propagateChange(this.options.filter(option => option.symbol.toLowerCase().indexOf(filterValue) === 0))
    return this.options.filter(option => option.symbol.toLowerCase().indexOf(filterValue) === 0);
  }
  
  writeValue(value): void {
    console.log(value)
    // if (value !== undefined) {
    //   this._filter(value);
    // }
    
  }
  propagateChange = (_: any) => {
    console.log(_)
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(value) {
    console.log(value)
  }
}
