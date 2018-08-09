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

  coins: Array<Ticker>;
  coinsForm = new FormControl();
  filteredCoins: Observable<any>;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCoins(100).subscribe(coinData => {
      this.coins = coinData;
    });
    this.filteredCoins = this.coinsForm.valueChanges.pipe(
        startWith(''), map(value => this._filter(value))
      );
  }

  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return filterValue;
    // return this.coins.pipe(map(res => res.filter(option => option.toLowerCase().includes(filterValue))));
    // return this.coins.filter(option => option.toLowerCase().includes(filterValue));
  }

}
