import { Component, OnInit, SimpleChanges } from '@angular/core';
import { DbService } from 'client/app/services/db.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BalanceService } from 'client/app/services/balance.service';
import { IMatOptions } from 'client/app/models/components';
import { AppLoadService } from 'client/app/services/app-load-service.service';

@Component({
  selector: 'global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  symbol: String; // Default symbol (from balance service)
  recvWindow: number; // Default window
  bidAskLimit: Number; // Default bid ask table
  baseCoin: String; // Default exchange coin for platform
  decimalPoints: Number;
  settingsType: string = 'global';

  globalSettings: Object;
  globalSettingsForm: FormGroup;
  baseCoinOptions: Array<IMatOptions> = [];

  constructor(private db: DbService, private snackBar: MatSnackBar, private balance: BalanceService, private apploadService: AppLoadService) {
  }

  ngOnInit() {
    this.loadData();
    this.buildForm();
    this.globalSettingsForm.get('recvWindow').valueChanges.subscribe(res => this.recvWindow = res);
    this.globalSettingsForm.get('bidAskLimit').valueChanges.subscribe(bidAskLimit => this.bidAskLimit = bidAskLimit);
    this.globalSettingsForm.get('baseCoin').valueChanges.subscribe(baseCoin => this.baseCoin = baseCoin);
    this.globalSettingsForm.get('decimalPoints').valueChanges.subscribe(decimalPoints => this.decimalPoints = decimalPoints);
  }

  ngOnChanges(c: SimpleChanges) {
    if (c.symbol.previousValue !== c.symbol.currentValue) {
      this.symbol = c.symbol.currentValue;
    }
  }

  buildForm() {
    this.globalSettingsForm = new FormGroup({
      recvWindow: new FormControl(null, Validators.required),
      bidAskLimit: new FormControl(null, Validators.required),
      baseCoin: new FormControl(null, Validators.required),
      decimalPoints: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.globalSettingsForm.valid) {
      const { symbol, recvWindow, bidAskLimit, baseCoin, decimalPoints } = this.globalSettingsForm.value;
      const body = {
        symbol: symbol,
        recvWindow: recvWindow,
        bidAskLimit: bidAskLimit,
        baseCoin: baseCoin,
        decimalPoints: decimalPoints
      }
      this.db.updateSettings(this.settingsType, body).subscribe(result => {
        console.log(result);
      })
    } else {
      console.log('form invalid', this.globalSettingsForm)
      this.snackBar.open('Invalid form fields, cannot be submitted', 'close');
    }
  }

  loadData() {
    this.db.getSettings(this.settingsType).subscribe(res => {
      this.symbol = res.symbol;
      this.globalSettingsForm.get('recvWindow').setValue(res.recvWindow);
      this.globalSettingsForm.get('bidAskLimit').setValue(res.bidAskLimit);
      this.globalSettingsForm.get('baseCoin').setValue(res.baseCoin.toLowerCase());
      this.globalSettingsForm.get('decimalPoints').setValue(res.decimalPoints)
    });

    this.balance.getAllQuoteAssets().then(res => {
      res.forEach((element, i) => {
        this.baseCoinOptions.push({
          value: element.toLowerCase(),
          viewValue: element.toUpperCase(),
        });
      });

    })
  }
}
