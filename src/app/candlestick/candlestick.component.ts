import { Component, OnInit } from '@angular/core';
import { MovingAverageService } from './moving-average.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.scss']
})
export class CandlestickComponent implements OnInit {

  graph;
  symbolCode: string;
  maLineY: Array<any>;
  maLineX: Array<any>;
  allDataPoints: Array<any> = [];
  openPrices: Array<any> = [];
  closePrices: Array<any> = [];
  highPrices: Array<any> = [];
  lowPrices: Array<any> = [];
  closeTime: Array<any> = [];

  constructor(private api: ApiService, private maService: MovingAverageService) {
  }

  ngOnInit() {
    this.symbolCode = 'ONTETH';
    this.api.getCandlestick(this.symbolCode).subscribe(d => {
      this.printGraph(d)
    }, error => {
      console.error('candlestick data error: ', error)
    })
    
  }
  printGraph(obj) {
    let maLineY = this.maService.updatePrices(obj.closePrices, 7);
    let maLineX = this.maService.updateDates(obj.closeTimeRaw, 3);
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
        {
          // Moving average
          x: maLineX,
          y: maLineY,
          type: 'scatter',
          xaxis: 'x',
          yaxis: 'y',
          mode: 'lines',
          line: { width: '1', },
        },
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
