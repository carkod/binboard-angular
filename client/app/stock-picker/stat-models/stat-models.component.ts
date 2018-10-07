import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { StreamsService } from '../../services/streams.service';
import { ApiService } from '../../services/api.service';
import * as Plotly from 'plotly.js/dist/plotly.js';
import { DbService } from '../../services/db.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'stat-models',
  templateUrl: './stat-models.component.html',
  styleUrls: ['./stat-models.component.scss'],
  providers: [DatePipe]
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

  // Model
  yAxis: Array<any>;
  xAxis: Array<any>;
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

  constructor(private db: DbService, private ws: StreamsService, private api: ApiService, private date: DatePipe) { }

  
  ngOnInit() {
    this.interval = '1d';
    this.limit = 50;
    this.count = 0;

    this.db.getCandlestick(this.symbolCode, this.interval, this.limit).subscribe(d => {
      this.apiData = d;
      let element = this.el.nativeElement;
      Plotly.newPlot(element, this.renderData(d), this.renderLayout(d));
    }, error => {
      console.error('candlestick data error: ', error)
    });

  }
  renderData(data) {
    this.data = [];
    this.xAxis = data.closeTime.map(date => {
      return this.date.transform(date, 'yyyy-MM-dd');
    });
    this.yAxis = data.closePrices.map(Number);
    const trace1 = {
      // x: ["2018-08-13", "2018-08-14", "2018-08-15", "2018-08-16", "2018-08-17", "2018-08-18", "2018-08-19", "2018-08-20"],
      // y: [0.00092939, 0.00096763, 0.00097922, 0.00099866, 0.0010181, 0.00115837, 0.00111872, 0.00114477],
      x: this.xAxis,
      y: this.yAxis,
      mode: 'lines',
      type: 'scatter'
    };
    var trace2 = {
      x: [2, 3, 4, 5],
      y: [16, 5, 11, 9],
      mode: 'lines',
      type: 'scatter'
    };
    this.data.push(trace1);

    return this.data;
  }

  renderLayout(data) {
    this.layout = {
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: true,
      xaxis: {
        autorange: false,
        range: [this.xAxis[0], this.xAxis[this.xAxis.length - 1]],
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        // title: this.symbolCode,
        autorange: true,
        range: [this.yAxis[0], this.yAxis[this.yAxis.length - 1]],
        type: 'linear',
        maxPoints: 50,
      }
      
    }
    return this.layout;
    
  }

  getPrediction(value) {
    console.log(value);
  }
}
