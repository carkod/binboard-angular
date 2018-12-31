import { Injectable, Input } from '@angular/core';
import { formatDate } from '@angular/common';
import { StandardDeviationService } from './standard-deviation.service';

@Injectable({
  providedIn: 'root'
})
export class MovingAverageService {

  @Input() interval: number;
  _mean: number;
  maArray: Array<any> = [];
  maArrayDates: Array<any> = [];
  maTopArray: Array<any> = [];
  maBottomArray: Array<any> = [];
  

  constructor(private sd: StandardDeviationService) {
    // Set interval for 30 min (add 30 min more)
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
      this.maArray.push(mean);
    }
    return this.maArray;
  }

  updateDates(dates: Array<any>, range?: number) {
    for (let i = 0; i < dates.length; i++) {
      const serverDate = dates[i + range];
      this.maArrayDates.push(serverDate);  
    }
    return this.maArrayDates;
  }
  updateTopBolliger(closePrices, range: number) {
    for (let i = 0; i < closePrices.length - (range - 1); i++) {
      const prepArray = closePrices.slice(i, i+range);
      const sum = prepArray.reduce((a, v) => {
        v = parseFloat(v);
        a = parseFloat(a);
        return a + v
      }, 0)
      // const mean = sumthis.sd.standardDeviation(prepArray);
      // this.maTopArray.push(mean);
    }
  }
}
