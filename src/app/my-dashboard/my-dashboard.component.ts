import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CryptotableComponent } from '../cryptotable/cryptotable.component';
import { StreamsService } from '../streams.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.scss'],

  
})
export class MyDashboardComponent implements OnInit{
  content = CryptotableComponent;
  pageElements: Array<any>;
  
  constructor(private streamService: StreamsService) {}
  ngOnInit() {

  }

  
  ngOnDestroy() {
  }

  log(...text) {
    console.log(...text);
  }
  
  displayStream() {
    
  }
}
