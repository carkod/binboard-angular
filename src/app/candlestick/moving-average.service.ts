import { Injectable } from '@angular/core';
import { closePrices } from './mock.data';

@Injectable({
  providedIn: 'root'
})
export class MovingAverageService {

  interval: number;
  _mean: number;
  newArray: Array<any>;

  constructor() {
    this.interval = 5
    this._mean = 0;
    this.newArray = [];
  }

  prepArray() {
    this.newArray = closePrices;
    return this.newArray;
  }



 
  
}
