import { Component, OnInit } from '@angular/core';
import { DbService } from 'client/app/services/db.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { BalanceService } from 'client/app/services/balance.service';
import { IMatOptions } from 'client/app/models/components';

@Component({
  selector: 'global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.scss']
})
export class GlobalComponent implements OnInit {

  symbol: String; // Default symbol (from balance service)
  recvWindow: number; // Default window
  bidAskLimit: Number = 5; // Default bid ask table
  baseCoin: String = 'BTC'; // Default exchange coin for platform
  decimalPoints: Number = 5;
  settingsType: string = 'global';

  globalSettings: Object;
  globalSettingsForm: FormGroup;
  symbolOptions: Array<IMatOptions>;

  constructor(private db: DbService, private snackBar: MatSnackBar, private balance: BalanceService) {
  }

  ngOnInit() {
    this.loadData();
    this.buildForm();
    this.globalSettingsForm.get('symbol').valueChanges.subscribe(symbol => this.symbol = symbol);
    this.globalSettingsForm.get('recvWindow').valueChanges.subscribe(res => this.recvWindow = res);
    this.globalSettingsForm.get('bidAskLimit').valueChanges.subscribe(bidAskLimit => this.bidAskLimit = bidAskLimit);
    this.globalSettingsForm.get('baseCoin').valueChanges.subscribe(baseCoin => this.baseCoin = baseCoin);
    this.globalSettingsForm.get('decimalPoints').valueChanges.subscribe(decimalPoints => this.decimalPoints = decimalPoints);
  }

  buildForm() {
    this.globalSettingsForm = new FormGroup({
      symbol: new FormControl(null, Validators.required),
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
    this.db.getSettings(this.settingsType).subscribe(res => this.globalSettings = res);
    this.balance.getAllQuoteAssets().then(res => {
      console.log(res);
      res.forEach(element => {
        this.symbolOptions.push({
          value: element.toLowerCase(),
          viewValue: element.toUpperCase()
        });
      });

    })
  }

}
