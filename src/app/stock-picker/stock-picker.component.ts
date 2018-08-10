import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup } from '../../../node_modules/@angular/forms';
import { Observable } from '../../../node_modules/rxjs';
import { startWith, map, filter } from '../../../node_modules/rxjs/operators';

export interface Ticker {
  symbol: string, price: string
}

@Component({
  selector: 'stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.scss']
})
export class StockPickerComponent implements OnInit {

  myControl = new FormControl();
  options: Ticker[];
  filteredOptions: Observable<Ticker[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCoins(100).subscribe(coinData => {
      this.options = coinData;
      debugger;
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Ticker>(''),
        map(value => typeof value === 'string' ? value : value.symbol),
        map(symbol => symbol ? this._filter(symbol) : this.options.slice())
      );
  }

  displayFn(coin?: Ticker): string | undefined {
    return coin ? coin.symbol : undefined;
  }

  private _filter(name: string): Ticker[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.symbol.toLowerCase().indexOf(filterValue) === 0);
  }

}
