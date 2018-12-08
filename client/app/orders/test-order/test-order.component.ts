import { Component, OnInit } from '@angular/core';
import { DbService } from 'client/app/services/db.service';

@Component({
  selector: 'test-order',
  templateUrl: './test-order.component.html',
  styleUrls: ['./test-order.component.scss']
})
export class TestOrderComponent implements OnInit {

  constructor(private db: DbService) { }

  ngOnInit() {
    // this.db.testOrder().subscribe(res => {
    //   console.log('test order result ', res);
    // })
  }

}
