import { Component, OnInit, ViewChild, ElementRef, Input, SimpleChange, SimpleChanges } from '@angular/core';
import { MovingAverageService } from './moving-average.service';
import { StreamsService } from '../services/streams.service';
import * as Plotly from 'plotly.js/dist/plotly.js';
import { DbService } from '../services/db.service';
import { StandardDeviationService } from './standard-deviation.service';
import { CandlestickToolsService } from './candlestick-tools.service';


@Component({
  selector: 'candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss'],
})
export class CandlestickComponent implements OnInit {
  @ViewChild('chart') el: ElementRef;
  @Input() symbolCode: string;

  // General
  graph;
  data;
  layout;
  interval: string = '30m';
  limit: number = 50;
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

  //Indicators
  @Input() bolligerBands: Boolean = true;
  @Input() sma: Boolean = true;

  constructor(
    private ws: StreamsService,
    private api: DbService,
    private maService: MovingAverageService,
    private sd: StandardDeviationService,
    private tools: CandlestickToolsService,
  ) {
  }

  ngOnInit() {
    this.count = 0;
    this.loadData();

    // this.ws.candlestickStream(this.symbolCode, this.interval).subscribe(sd => {
    //   let element = this.el.nativeElement;
    //   this.updateGraph(element, sd);

    // });

  }

  ngOnChanges(c: SimpleChanges) {
    if (c.symbolCode.currentValue !== c.symbolCode.previousValue) {
      this.loadData();
    }
  }

  loadData() {
    this.api.getCandlestick(this.symbolCode, this.interval, this.limit).subscribe(d => {
      this.apiData = d;
      let element = this.el.nativeElement;
      Plotly.newPlot(element, this.renderData(d), this.renderLayout(d))
    }, error => {
      console.error('candlestick data error: ', error)
    });
  }

  renderLayout(obj) {
    console.log(this.tools.bollingerAnnotations(obj))
    this.layout = {
      dragmode: 'zoom',
      margin: { r: 40, t: 60, b: 40, l: 80 },
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
      },
      annotations: this.tools.bollingerAnnotations(obj),
      shapes: this.tools.bollingerShapes(obj),
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
        decreasing: { line: { color: 'red', width: '0.5' } },
        increasing: { line: { color: 'green', width: '0.5' } },
        line: { color: '#17BECF', opacity: 0.5 },
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      },
    ];
    if (this.bolligerBands) {
      this.renderBollinger(obj);
    }

    return this.data;
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
      Plotly.update(element, this.renderData(this.apiData), this.renderLayout(this.apiData), [0]);
      // console.log('received non repeating candlestick ', element.data);
    } else if (this.apiData && this.repetition(sd)) {
      // console.log('received repeated ', element.data);
      const i = this.apiData.closeTime.findIndex(x => x.getTime() === sd.closeTime.getTime());

      this.apiData.openPrices.splice(i, 0, sd.openPrices);
      this.apiData.highPrices.splice(i, 0, sd.highPrices);
      this.apiData.lowPrices.splice(i, 0, sd.lowPrices);
      this.apiData.closePrices.splice(i, 0, sd.closePrices);
      this.apiData.closeTime.splice(i, 0, sd.closeTime);

      Plotly.update(element, this.renderData(this.apiData), this.renderLayout(this.apiData), [0]);
    }
  }
  repetition(sd) {
    // Check whether ws has sent repeated data points
    const currentTime = this.apiData.closeTime[this.apiData.closeTime.length - 1].getTime();
    // const currentPrice = this.apiData.closePrices[this.apiData.closePrices.length];
    return (sd.closeTime.getTime() === currentTime);
  }

  toggleChart(chart) {
    console.log(chart)
  }
  toggleChartOptions(options) {
    console.log(options)
  }
  renderBollinger(obj) {

    const sma = {
      // Moving average
      x: this.maService.updateDates(obj.closeTime, 3),
      y: this.maService.updatePrices(obj.closePrices, 7),
      type: 'scatter',
      xaxis: 'x',
      yaxis: 'y',
      mode: 'lines',
      line: { width: '1', },
    };
    const tBand = {
      // Moving average Top (Top Bollinger)
      x: this.maService.updateDates(obj.closeTime, 3),
      y: this.maService.updateTopBolliger(obj.closePrices, 7),
      type: 'scatter',
      xaxis: 'x',
      yaxis: 'y',
      mode: 'lines',
      line: { width: '1', color: 'blue' },
    };
    const bBand = {
      // Moving average Bottom (Bottom Bollinger)
      x: this.maService.updateDates(obj.closeTime, 3),
      y: this.maService.updateBottomBolliger(obj.closePrices, 7),
      type: 'scatter',
      xaxis: 'x',
      yaxis: 'y',
      mode: 'lines',
      line: { width: '1', color: 'blue' },
    }
    this.data.push(sma);
    this.data.push(tBand);
    this.data.push(bBand);
  }
}
