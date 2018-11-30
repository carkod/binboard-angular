import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'global-settings',
  templateUrl: './global-settings.component.html',
  styleUrls: ['./global-settings.component.scss']
})
export class GlobalSettingsComponent implements OnInit {

  symbol: String; // Default symbol (from balance service)
  recvWindow: Number; // Default window
  bidAskLimit: Number = 5; // Default bid ask table
  constructor() { }

  ngOnInit() {
  }

}
