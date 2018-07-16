import { Component, OnInit, OnChanges } from '@angular/core';
// import { dates, closePrices, highPrices, lowPrices, openPrices } from './mock.data';
import { dates } from './mock.data';
import { MovingAverageService } from './moving-average.service';
import { ApiService } from '../api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.css']
})
export class CandlestickComponent implements OnInit, OnChanges {

  graph: object;
  maLineY: Array<any>;
  maLineX: Array<any>;
  allDataPoints: Array<any> = [];
  openPrices: Array<any> = [];
  closePrices: Array<any> = [];
  highPrices: Array<any> = [];
  lowPrices: Array<any> = [];

  constructor(private api: ApiService, private maService: MovingAverageService) {
    

  }

  ngOnInit() {
    // this.api.getCandlestick().subscribe((d: Array<any>) => {
    //   this.allDataPoints = (<any>d).reduce((datum, point, i, arr) => {
    //     datum.push(point[2]);
    //     // this.closePrices.push(point[3]);
    //     // this.highPrices.push(point[4]);
    //     // this.lowPrices.push(point[5]);
    //     return datum;

    //   }, []);
    // });
    this.api.getCandlestick().subscribe(d => {
      console.log(d)
    })

    // this.maLineY = this.maService.updatePrices(this.closePrices);
    this.maLineX = this.maService.updateDates(dates);


    this.graph = {
      data: [
        {
          // Price chart
          x: dates,
          close: this.closePrices,
          decreasing: { line: { color: '#7F7F7F' } },
          high: this.highPrices,
          increasing: { line: { color: '#17BECF' } },
          line: { color: 'rgba(31,119,180,1)' },
          low: this.lowPrices,
          open: this.openPrices,
          type: 'candlestick',
          xaxis: 'x',
          yaxis: 'y'
        },
        {
          // Moving average
          x: this.maLineX,
          y: this.maLineY,
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

  }
  ngOnChanges(changes) {
    console.log(changes)
  }

}
