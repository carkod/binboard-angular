import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { DbService } from '../../services/db.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Component({
  selector: 'detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  id: any;
  private sub: any;
  symbol: string;
  data: Object;

  constructor(private db: DbService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.symbol = params['symbol'];
      this.db.getSingleCoinStats(this.symbol).subscribe(data => this.data = data);
    });
  } 

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
