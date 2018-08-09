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
    this.interval = 5
    this._mean = 0;
    this.maArray = [];
    this.maArrayDates = [];
  }

  updatePrices(closePrices: Array<any>) {
    for (let i = 0; i < closePrices.length - (this.interval - 1); i++) {
      
      const prepArray = closePrices.slice(i, i+this.interval);
      const sum = (prepArray.reduce((a, v) => a + v));
      const mean = sum/this.interval;
      this.maArray.push(mean);
    }
    return this.maArray;
  }

  updateDates(dates: Array<any>) {
    for (let i = 0; i < dates.length; i++) {
      const serverDate = new Date(dates[i]);
      serverDate.setDate(serverDate.getDate() + this.interval);
      const dateFormatted = formatDate(serverDate, 'yyyy-MM-dd', 'en');
      // const prepArray = dates.slice(i, i+this.interval);
      this.maArrayDates.push(dateFormatted);  
    }
    return this.maArrayDates;
  }

}
