import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.scss']
})
export class StockPickerComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.getCoins(100).subscribe(d => {
      console.log(d);
    })
  }

}
