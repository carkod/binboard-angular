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
  mergedData;

  constructor(private ws: StreamsService, private api: ApiService, private maService: MovingAverageService) {
  }

  ngOnInit() {
    this.symbolCode = 'ONTETH';
    this.interval = '30m';
    
    this.api.getCandlestick(this.symbolCode).subscribe(d => {
      this.apiData = d;
      this.printGraph(d);
    }, error => {
      console.error('candlestick data error: ', error)
    });
    
    this.ws.candlestickStream(this.symbolCode, this.interval).subscribe(d => {
      if (this.apiData) {
        console.log(d);
        
        this.mergedData = [
          {
          openPrices: d.openPrices,
          highPrices: d.highPrices,
          lowPrices: d.lowPrices,
          closePrices: d.closePrices,
          closeTime: d.closeTime
          },
          [0]
        ]
        // this.apiData.openPrices;
        // this.apiData.highPrices;
        // this.apiData.lowPrices.push(d.lowPrices);
        // this.apiData.closePrices.push(d.closePrices);
        // this.apiData.closeTime.push(d.closeTime);
        // this.apiData.closeTimeRaw.push(d.closeTimeRaw);
        
      }
    });
    
    
  }
  ngOnDestroy() {
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
          range: [obj.closeTime[0], obj.closeTime[obj.closeTime.length]],
          // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']}, 
          title: 'Date',
          type: 'date'
        },
        yaxis: {
          title: this.symbolCode,
          autorange: true,
          domain: [0, 1],
          range: [obj.closePrices[0], obj.closePrices[obj.closePrices.length]],
          tickformat: '.10f',
          type: 'linear'
        }
      }
    }
    return this.graph;
  }
}
