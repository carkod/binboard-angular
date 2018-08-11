import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { FormControl, FormGroup } from '../../../../node_modules/@angular/forms';
import { Observable } from '../../../../node_modules/rxjs';
import { startWith, map } from '../../../../node_modules/rxjs/operators';

export interface Ticker {
  symbol: string, price: string
}

@Component({
  selector: 'coin-suggester',
  templateUrl: './coin-suggester.component.html',
  styleUrls: ['./coin-suggester.component.scss']
})
export class CoinSuggesterComponent implements OnInit {

  myControl = new FormControl();
  options: Ticker[];
  filteredOptions: Observable<Ticker[]>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCoins(100).subscribe(coinData => {
      this.options = coinData;
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith<string | Ticker>(''),
        map(value => typeof value === 'string' ? value : value.symbol),
        map(symbol => symbol ? this._filter(symbol) : this.options.slice())
      );
      console.log(this.filteredOptions)
    });
  }

  displayFn(coin?: Ticker): string | undefined {
    return coin ? coin.symbol : undefined;
  }

  private _filter(name: string): Ticker[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.symbol.toLowerCase().indexOf(filterValue) === 0);
  }
}
