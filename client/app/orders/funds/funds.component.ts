import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { DbService } from 'client/app/services/db.service';
import { BalanceService } from 'client/app/services/balance.service';

@Component({
  selector: 'funds',
  templateUrl: './funds.component.html',
  styleUrls: ['./funds.component.scss']
})
export class FundsComponent implements OnInit, OnDestroy {

  currentTrades: Array<any> = [];
  currentTradesProps: Array<String>;
  displayedColumns: Array<String> = ['asset', 'free', 'price', 'symbol', 'total'];
  totalBalance: String;

  balancesSubscription: Subscription;

  constructor(private db: DbService, private balances: BalanceService) { }

  ngOnInit() {
    this.currentTrades = [];
    // this.balances.getTotalBalance().then(data => {
    //   this.currentTrades = data
    // });
    // this.balances.getBtcAmout().then(data => {
    //   this.totalBalance = data + ' BTC';
    // })
  }

  ngOnDestroy() {
    if (this.balancesSubscription) {
      this.balancesSubscription.unsubscribe();
    }
  }
}
