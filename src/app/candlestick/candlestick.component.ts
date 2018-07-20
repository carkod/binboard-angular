import { Component, OnInit, OnChanges } from '@angular/core';
// import { dates, closePrices, highPrices, lowPrices, openPrices } from './mock.data';
import { MovingAverageService } from './moving-average.service';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.css']
})
export class CandlestickComponent implements OnInit {

  graph;
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
    this.api.getCandlestick().subscribe(d => {
      console.log(d)
      this.printGraph(d)
    }, error => {
      console.error('candlestick data error: ', error)
    })
  }
  printGraph(obj) {
    let maLineY = this.maService.updatePrices(obj.closePrices);
    let maLineX = this.maService.updateDates(obj.closeTime);
    this.graph = {
      data: [
        {
          // Price chart
          x: obj.closeTime,
          close: obj.closePrices,
          decreasing: { line: { color: '#7F7F7F' } },
          high: obj.highPrices,
          increasing: { line: { color: '#17BECF' } },
          line: { color: 'rgba(31,119,180,1)' },
          low: obj.lowPrices,
          open: obj.openPrices,
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
          range: ['2017-01-03 12:00', '2017-02-15 12:00'],
          // rangeslider: {range: ['2017-01-03 12:00', '2017-02-15 12:00']}, 
          title: 'Date',
          type: 'date'
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [114.609999778, 137.410004222],
          type: 'linear'
        }
      }
    }
    return this.graph;
  }

}
