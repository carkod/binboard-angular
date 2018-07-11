import { Component, OnInit } from '@angular/core';
import { dates, closePrices, highPrices, lowPrices, openPrices } from './mock.data';
import { MovingAverageService } from './moving-average.service';

@Component({
  selector: 'candlestick',
  templateUrl: './candlestick.component.html',
  styleUrls: ['./candlestick.component.css']
})
export class CandlestickComponent implements OnInit {

  graph: object;
  maLineY: Array<any>;
  maLineX: Array<any>;

  constructor(private maService: MovingAverageService) { }

  ngOnInit() {
    
    this.maLineY = this.maService.updatePrices(closePrices);
    this.maLineX = this.maService.updateDates(dates);
    console.log(this.maLineX);
    this.graph = {
      data: [
        {
          // Price chart
          x: dates, 
          close: closePrices, 
          decreasing: {line: {color: '#7F7F7F'}}, 
          high: highPrices, 
          increasing: {line: {color: '#17BECF'}}, 
          line: {color: 'rgba(31,119,180,1)'}, 
          low: lowPrices, 
          open: openPrices, 
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

}
