import { Injectable } from '@angular/core';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class MovingAverageService {

  interval: number;
  _mean: number;
  maArray: Array<any>;
  maArrayDates: Array<any>;
  

  constructor() {
    // Set interval for 30 min (add 30 min more)
    // this.interval = 5;
    this.maArray = [];
    this.maArrayDates = [];
  }
  /**
   * Updates prices as new data and a range is feeded into it
   * @param closePrices - binance only
   * @param {float} range - e.g. 5 will calculate Average with 5 numbers, it must be a discreet number
   */
  updatePrices(closePrices: Array<any>, range: number) {
    for (let i = 0; i < closePrices.length - (range - 1); i++) {
      
      const prepArray = closePrices.slice(i, i+range);
      const sum = prepArray.reduce((a, v) => {
        v = parseFloat(v);
        a = parseFloat(a);
        return a + v
      }, 0)
      const mean = sum/range;
      // console.log(mean)
      this.maArray.push(mean);  
    }
    return this.maArray;
  }

  updateDates(dates: Array<any>) {
    for (let i = 0; i < dates.length; i++) {
      const serverDate = dates[i] ;
      // serverDate.setDate(serverDate.getDate() + this.interval);
      // const dateFormatted = formatDate(serverDate, 'yyyy-MM-dd', 'en');
      // const prepArray = dates.slice(i, i+this.interval);
      const dateFormatted = `${serverDate.getFullYear()}-${serverDate.getMonth() + 1}-${serverDate.getDate()} ${serverDate.getHours()}:${serverDate.getMinutes()}:${serverDate.getSeconds()}`;
      this.maArrayDates.push(dateFormatted);  
    }
    return this.maArrayDates;
  }

}
