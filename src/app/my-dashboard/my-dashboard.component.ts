import { Component } from '@angular/core';
import { CryptotableComponent } from '../cryptotable/cryptotable.component';

@Component({
  selector: 'my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css'],
  
})
export class MyDashboardComponent {
  content = CryptotableComponent;
  cards = [
    { title: 'All Cryptocurrencies', content: this.content, cols: 2, rows: 1 },
    { title: 'Picked', cols: 1, rows: 2 },
    { title: 'Card 3', cols: 1, rows: 1 },
    { title: 'Card 4', cols: 1, rows: 1 }
  ];

  constructor() {}
}
