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
    this.interval = 5;
    this._mean = 0;
    this.maArray = [];
    this.maArrayDates = [];
  }

  updatePrices(closePrices: Array<any>) {
    for (let i = 0; i < closePrices.length - (this.interval - 1); i++) {
      
      const prepArray = closePrices.slice(i, i+this.interval);
      const sum = prepArray.reduce((a, v) => {
        v = parseFloat(v);
        a = parseFloat(a);
        return a + v
      }, 0)
      const mean = sum/this.interval;
      // console.log(mean)
      this.maArray.push(mean);  
    }
    return this.maArray;
  }

  updateDates(dates: Array<any>) {
    for (let i = 0; i < dates.length; i++) {
      const serverDate = dates[i];
      // serverDate.setDate(serverDate.getDate() + this.interval);
      // const dateFormatted = formatDate(serverDate, 'yyyy-MM-dd', 'en');
      // const prepArray = dates.slice(i, i+this.interval);
      const dateFormatted = `${serverDate.getFullYear()}-${serverDate.getMonth()}-${serverDate.getDay()} ${serverDate.getHours()}:${serverDate.getMinutes()}:${serverDate.getSeconds()}`;
      this.maArrayDates.push(dateFormatted);  
    }
    return this.maArrayDates;
  }

}
