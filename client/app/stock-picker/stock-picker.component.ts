import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormControl, FormGroup } from '../../../node_modules/@angular/forms';
import { Observable } from '../../../node_modules/rxjs';
import { startWith, map, filter } from '../../../node_modules/rxjs/operators';



@Component({
  selector: 'stock-picker',
  templateUrl: './stock-picker.component.html',
  styleUrls: ['./stock-picker.component.scss']
})
export class StockPickerComponent implements OnInit {

  constructor(private api: ApiService) { }

  ngOnInit() {
    
  }
}
