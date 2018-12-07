import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '../../../node_modules/@angular/router';
import { DrawerService } from '../services/drawer.service';
import { DbService } from '../services/db.service';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.scss']
})
export class TopToolbarComponent implements OnInit {

  pageTitle: any;
  totalBalance: Number = 0;
  euroPrice: Number;
  totalEuros: Number = 0;

  constructor(private db: DbService, private route: ActivatedRoute, private drawerService: DrawerService, private balance: BalanceService) { 
    this.loadBalanceAmount();
  }

  ngOnInit() {
    this.route.data.subscribe(d => {
      this.pageTitle = d.pageTitle;
    });
    
  }
  toggle() {
    this.drawerService.toggle();
  }

  private loadBalanceAmount() {
    this.balance.getBtcAmout().then(data => {
      this.totalBalance = +data;
    });
    this.balance.getEurAmount().then(res => {
      this.euroPrice = +res.BTCEUR.last;
      this.totalEuros = +this.totalBalance * +this.euroPrice;
      this.totalEuros = +this.totalEuros.toFixed(2);
    })
  }


}
