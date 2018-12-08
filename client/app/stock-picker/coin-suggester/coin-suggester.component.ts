import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { DbService } from '../../services/db.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormControl, FormGroup } from '@angular/forms';

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
export class CoinSuggesterComponent implements ControlValueAccessor, OnChanges, OnInit {

  @Input() defaultSymbol: String;
  myControl: FormControl = new FormControl();
  options: Ticker[];
  filteredOptions: Observable<Ticker[]>;
  symbol: String;
  stopSymbolBindingCount = 0;

  constructor(private db: DbService) {
    this.db.getTicker().subscribe(coinData => {
      coinData = JSON.parse(coinData);
      this.options = coinData;
      const findDefault = this.options.find(x => x.symbol === 'ONTETH')
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        // startWith<string | Ticker>(''),
        map(value => typeof value === 'string' ? value : value.symbol),
        map(symbol => symbol ? this._filter(symbol) : this.options.slice())
      );
    });
  }

  ngOnInit() {
  }

  ngOnChanges(c: SimpleChanges) {
    const { defaultSymbol } = c;
    if (defaultSymbol.currentValue !== undefined && defaultSymbol.previousValue !== defaultSymbol.currentValue && this.stopSymbolBindingCount < 1) {
      // this.displayFn(defaultSymbol.currentValue)
      this.myControl.setValue(defaultSymbol.currentValue)
      // Only execute setvalue for the first input binding (need better solution)
      this.stopSymbolBindingCount++;
    }
  }

  displayFn(coin?: any): string | undefined {
    if (coin !== null) {
      return this.symbol = coin;   
    }
  }

  private _filter(name: string): any {
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

  log(...text) {
    console.log(...text);
  }
}
