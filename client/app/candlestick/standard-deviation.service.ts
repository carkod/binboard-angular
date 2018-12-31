import { Injectable } from '@angular/core';

@Injectable()
export class StandardDeviationService {

  constructor() { 
  }

  standardDeviation(values){
    var avg = this.average(values);
    
    var squareDiffs = values.map(function(value){
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
    });
    
    var avgSquareDiff = this.average(squareDiffs);
  
    var stdDev = Math.sqrt(avgSquareDiff).toFixed(10);
    return stdDev;
  }
  
  average(data){
    var sum = data.reduce(function(sum, value){
      return parseFloat(sum) + parseFloat(value);
    }, 0);
  
    var avg = sum / data.length;
    return avg;
  }
  
}
