import { Component, OnInit } from '@angular/core';
import { MovingAverageService } from './moving-average.service';
import { ApiService } from '../api.service';
import { StreamsService } from '../streams.service';

@Component({
  selector: 'candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss']
})
export class CandlestickComponent implements OnInit {

  // General
  graph;
  symbolCode: string;
  interval: string;

  // Candlestick
  maLineY: Array<any>;
  maLineX: Array<any>;
  allDataPoints: Array<any> = [];
  openPrices: Array<any> = [];
  closePrices: Array<any> = [];
  highPrices: Array<any> = [];
  lowPrices: Array<any> = [];
  closeTime: Array<any> = [];

  //Streams
  results: boolean;

  constructor(private ws: StreamsService, private api: ApiService, private maService: MovingAverageService) {
  }

  ngOnInit() {
    this.symbolCode = 'ONTETH';
    this.interval = '30m';
    this.results = true;
    this.api.getCandlestick(this.symbolCode).subscribe(d => {
      this.printGraph(d)
    }, error => {
      console.error('candlestick data error: ', error)
    });
    this.ws.getStream(this.symbolCode, this.interval).subscribe(
      (points: any) => {
        this.results = points.k;
        console.log(this.results)
      },
      (err) => console.error(err),
      () => console.log('complete')
    );
    
  }
  ngOnDestroy() {
    this.ws.getStream('onteth', '30m').unsubscribe();
  }
  printGraph(obj) {
    let maLineY = this.maService.updatePrices(obj.closePrices, 7);
    let maLineX = this.maService.updateDates(obj.closeTimeRaw, 3);
    let ma7Trace = {
      // Moving average
      x: maLineX,
      y: maLineY,
      type: 'scatter',
      xaxis: 'x',
      yaxis: 'y',
      mode: 'lines',
      line: { width: '1', },
    };
    this.graph = {
      data: [
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
        ma7Trace,
      ],
      layout: {
        dragmode: 'zoom',
        margin: {
          r: 10,
          t: 25,
          b: 40,
          l: 60
        },
        showlegend: false,
        xaxis: {
          autorange: true,
          domain: [0, 1],
          range: [obj.closeTime[0], obj.closeTime[99]],
          // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']}, 
          title: 'Date',
          type: 'date'
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [obj.closePrices[0], obj.closePrices[99]],
          tickformat: '.10f',
          type: 'linear'
        }
      }
    }
    return this.graph;
  }

}
