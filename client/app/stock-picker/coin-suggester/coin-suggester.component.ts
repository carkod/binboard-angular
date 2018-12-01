import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DbService } from '../../services/db.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

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
export class CoinSuggesterComponent implements ControlValueAccessor, OnChanges {

  @Input() defaultSymbol: String;
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

  ngOnChanges(c: SimpleChanges) {
    const { defaultSymbol } = c;
    if (defaultSymbol.currentValue !== undefined && this.defaultSymbol === undefined) {
      // this.defaultSymbol = defaultSymbol;
      this.myControl.setValue(defaultSymbol.currentValue);
    }
  }

  displayFn(coin?: Ticker): string | undefined {
    this.propagateChange(coin);
    return coin ? coin.symbol : undefined;
  }

  private _filter(name: string): Ticker[] {
    const filterValue = name.toLowerCase();
    const value = this.options.filter(option => option.symbol.toLowerCase().indexOf(filterValue) === 0);
    this.propagateChange(value[0].symbol);
    return value;
  }
  
  writeValue(value): void {
    console.log(value)
  }
  propagateChange = (_: any) => {
  };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(value) {
    // console.log(value)
  }

  log(...text) {
    console.log(...text);
  }
}
