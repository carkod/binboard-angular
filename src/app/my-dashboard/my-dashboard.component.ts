import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CryptotableComponent } from '../cryptotable/cryptotable.component';
import { StreamsService } from '../streams.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css'],

  
})
export class MyDashboardComponent implements OnInit{
  content = CryptotableComponent;
  results;
  
  constructor(private streamService: StreamsService) {}

  

  ngOnInit() {
    this.streamService.getStream().subscribe(
      (points: any) => {
        this.results = points.k;
        console.log(this.results)
      },
      (err) => console.log(err),
      () => console.log('complete')
    );
  }

  
  ngOnDestroy() {
    this.streamService.getStream().unsubscribe();
  }

  log(...text) {
    console.log(...text);
  }
  
  displayStream() {
    
  }
}
