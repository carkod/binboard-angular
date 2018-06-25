import { Component, OnInit } from '@angular/core';
import { CryptotableComponent } from '../cryptotable/cryptotable.component';
import { StreamsService } from '../streams.service';

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
    this.streamService.getStream().subscribe((data: any) => {
      this.results = data
      console.log(this.results)
    });
  }
  
  displayStream() {
    
  }
}
