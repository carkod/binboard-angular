import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { StreamsService } from '../../services/streams.service';
import { ApiService } from '../../services/api.service';
import * as Plotly from 'plotly.js/dist/plotly.js';
import { DbService } from '../../services/db.service';

@Component({
  selector: 'stat-models',
  templateUrl: './stat-models.component.html',
  styleUrls: ['./stat-models.component.scss']
})
export class StatModelsComponent implements OnInit {

  @ViewChild('statModels') el: ElementRef;
  @Input() symbolCode: string;

  // General
  graph;
  data;
  layout;
  interval: string;
  limit: number;
  element;

  // Candlestick
  maLineY: Array<any>;
  maLineX: Array<any>;
  apiData;
  openPrices: Array<any> = [];
  closePrices: Array<any> = [];
  highPrices: Array<any> = [];
  lowPrices: Array<any> = [];
  closeTime: Array<any> = [];

  //Streams
  results: boolean;
  updateTrace: Object;
  updateTime: Object;
  count;


  constructor(private db: DbService, private ws: StreamsService, private api: ApiService) { }

  
  ngOnInit() {
    this.interval = '30m';
    this.limit = 50;
    this.count = 0;

    this.api.getCandlestick(this.symbolCode, this.interval, this.limit).subscribe(d => {
      this.apiData = d;
      console.log(this.apiData)
      let element = this.el.nativeElement;
      Plotly.newPlot(element)
      // console.log(this.apiData);
    }, error => {
      console.error('candlestick data error: ', error)
    });

  }
  renderData(data) {
       
  }
}
