import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundDecimals'
})
export class RoundDecimalsPipe implements PipeTransform {

  transform(value: any, decimals?: any): any {
    const round = parseFloat(value).toFixed(decimals);
    console.log(round);
    return round;
;
  }

}
