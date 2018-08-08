import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovingAverageService } from './moving-average.service';
import { ApiService } from '../api.service';
import { StreamsService } from '../streams.service';
import { PlotlyService } from '../../../node_modules/angular-plotly.js';
// import * as Plotly from 'plotly.js/dist/plotly.js';


@Component({
  selector: 'candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss'],
  providers: [PlotlyService]
})
export class CandlestickComponent implements OnInit {
  @ViewChild('chart') el: ElementRef;

  // General
  graph;
  data;
  layout;
  symbolCode: string;
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

  constructor(private ps: PlotlyService, private ws: StreamsService, private api: ApiService, private maService: MovingAverageService) {
  }

  ngOnInit() {
    this.symbolCode = 'ONTETH';
    this.interval = '30m';
    this.limit = 50;
    this.count = 0;

    this.api.getCandlestick(this.symbolCode, this.interval, this.limit).subscribe(d => {
      this.apiData = d;
      let element = this.el.nativeElement;
      this.ps.newPlot(element, this.renderData(d), this.renderLayout(d))
      // console.log(this.apiData);
    }, error => {
      console.error('candlestick data error: ', error)
    });

    this.ws.candlestickStream(this.symbolCode, this.interval).subscribe(sd => {
      let element = this.el.nativeElement;
      // console.log(sd);
      this.updateGraph(element, sd);
      
    });

  }

  renderLayout(obj) {
    this.layout = {
      dragmode: 'zoom',
      margin: {
        r: 10,
        t: 25,
        b: 40,
        l: 60
      },
      showlegend: false,
      xaxis: {
        autorange: false,
        // domain: [0, 1],
        range: [obj.closeTime[0], obj.closeTime[obj.closeTime.length - 1]],
        // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']}, 
        title: 'Date',
        type: 'date'
      },
      yaxis: {
        title: this.symbolCode,
        autorange: true,
        domain: [0, 1],
        // range: [obj.closePrices[0 + this.count], obj.closePrices[obj.closePrices.length - 1]],
        tickformat: '.10f',
        type: 'linear',
        maxPoints: 50,
      }
    }
    return this.layout;
  }
  renderData(obj) {
    this.data = [
      {
        // Price chart
        x: obj.closeTime,
        open: obj.openPrices,
        close: obj.closePrices,
        high: obj.highPrices,
        low: obj.lowPrices,
        decreasing: { line: { color: 'red' } },
        increasing: { line: { color: 'green' } },
        line: { color: '#17BECF' },
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      },
      // {
      //   // Moving average
      //   x: this.maService.updateDates(obj.closeTimeRaw, 3),
      //   y: this.maService.updatePrices(obj.closePrices, 7),
      //   type: 'scatter',
      //   xaxis: 'x',
      //   yaxis: 'y',
      //   mode: 'lines',
      //   line: { width: '1', },
      // }
    ];
    return this.data;
  }
  update(e) {
    console.log('updated', e);
  }

  updateGraph(element, sd) {
    if (this.apiData && !this.repetition(sd)) {
      this.count++;

      this.apiData.openPrices.concat([sd.openPrices]).shift();
      this.apiData.highPrices.concat([sd.highPrices]).shift();
      this.apiData.lowPrices.concat([sd.lowPrices]).shift();
      this.apiData.closePrices.concat([sd.closePrices]).shift();
      this.apiData.closeTime.concat([sd.closeTime]).shift();

      // this.apiData.closeTimeRaw.push(sd.closeTimeRaw);
      this.ps.update(element, this.renderData(this.apiData), this.renderLayout(this.apiData), [0]);
      // console.log('received non repeating candlestick ', element.data);
    } else if (this.apiData && this.repetition(sd)) {
      // console.log('received repeated ', element.data);
      const i = this.apiData.closeTime.findIndex(x => x.getTime() === sd.closeTime.getTime());

      this.apiData.openPrices.splice(i, 0, sd.openPrices);
      this.apiData.highPrices.splice(i, 0, sd.highPrices);
      this.apiData.lowPrices.splice(i, 0, sd.lowPrices);
      this.apiData.closePrices.splice(i, 0, sd.closePrices);
      this.apiData.closeTime.splice(i, 0, sd.closeTime);
      
      this.ps.update(element, this.renderData(this.apiData), this.renderLayout(this.apiData), [0]);
    }
  }
  repetition(sd) {
    // Check whether ws has sent repeated data points
    const currentTime = this.apiData.closeTime[this.apiData.closeTime.length - 1].getTime();
    // const currentPrice = this.apiData.closePrices[this.apiData.closePrices.length];
    return (sd.closeTime.getTime() === currentTime);
  }
}
