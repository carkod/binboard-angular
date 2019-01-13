import { Injectable } from '@angular/core';
import { MovingAverageService } from './moving-average.service';
import { Annotations } from './candlestick.models';
import { Observable } from 'rxjs';

export interface IAnnotation {
  x: Date;
  y: Number; // this is not price but position
  xref: String;
  yref: String;
  text: String;
  font?: { color: String };
  showarrow?: Boolean;
  xanchor: String;
  ax: Number;
  ay: Number;
}

@Injectable()
export class CandlestickToolsService {

  annotations: Array<IAnnotation> = [];
  shapes: Array<any> = [];

  constructor(private ma: MovingAverageService) { }

  // bollingerShapes(obj) {
  //   // const exampleDate = new Date('2019-01-05T04:59:59');
  //   // const exampleDate1 = new Date('2019-01-05T05:29:59');
  //   const { closePrices, openPrices } = obj;
  //   console.log(closePrices, openPrices)
  //   const topBollinger = this.ma.updateTopBolliger(obj.closePrices, 7);
  //   const bottomBollinger = this.ma.updateBottomBolliger(obj.closePrices, 7);
  //   obj.forEach((p, i) => {
  //     const priceDiff = p.closePrices - p.openPrices;
  //     topBollinger.forEach(band => {
  //       if (priceDiff > 0 && p.openPrices > band) {
  //         const shapes = {
  //           type: 'rect',
  //           xref: 'x',
  //           yref: 'paper',
  //           x0: p.closeTime[i],
  //           y0: 0,
  //           x1: p.closeTime[i].getTime() + 1800000, // price timestamp + 30 min (next date point)
  //           y1: 1,
  //           fillcolor: '#d3d3d3',
  //           opacity: 0.2,
  //           line: {
  //             width: 0
  //           }
  //         }
  //         this.shapes.push(shapes);
  //       }
  //     });
  //   });
  //   return this.shapes;
  // }

  bollingerAnnotations(obj) {
    const { closePrices, openPrices, closeTime } = obj;
    const range = 7;
    let bbIndex = 0; // counter for Bollinger bands (length - range)
    let annotations = [];
    for (let i = range; i < closePrices.length; i++) {
      bbIndex++
      const close = Number(closePrices[i]);
      const open = Number(openPrices[i]);
      const topBand = this.ma.updateTopBolliger(closePrices, range);
      const bottomBand = this.ma.updateBottomBolliger(closePrices, range);
      if (close > open) {
        // Increase (green)
        const priceDiff = close > topBand[bbIndex];
        // If close price is higher than topBand, buy
        if (priceDiff) {
          // Execute buy order
          console.log('paint buy')

          const annotation: IAnnotation = {
            x: closeTime[i],
            y: 1,
            xref: 'x',
            yref: 'paper',
            text: 'Resistance break, buy',
            font: { color: 'magenta' },
            showarrow: false,
            xanchor: 'right',
            ax: -50,
            ay: 0
          };
          this.annotations.push(annotation);
        }
        // If close price is lower than topBand, do nothing
      } else if (close < open) {
        // decrease (red)
        const bottomPriceDiff = close < bottomBand[bbIndex];
        // if close price is lower than bottomBand, sell
        if (bottomPriceDiff) {
          // Execute sell if funds have possession of this currency

          console.log('paint sell');

          const annotation: IAnnotation = {
            x: closeTime[i],
            y: 1,
            xref: 'x',
            yref: 'paper',
            text: 'Support break, sell',
            font: { color: 'magenta' },
            showarrow: false,
            xanchor: 'right',
            ax: -50,
            ay: 0
          };
          annotations.push(annotation);
        }
        // else do nothing
      }
    }
    return annotations;
  }

  bollingerShapes(obj) {
    const { closePrices, openPrices, closeTime } = obj;
    const range = 7;
    let bbIndex = 0; // counter for Bollinger bands (length - range)
    let shapes = [];
    for (let i = range; i < closePrices.length; i++) {
      bbIndex++
      const close = Number(closePrices[i]);
      const open = Number(openPrices[i]);
      const topBand = this.ma.updateTopBolliger(closePrices, range);
      const bottomBand = this.ma.updateBottomBolliger(closePrices, range);
      if (close > open) {
        // Increase (green)
        const priceDiff = close > topBand[bbIndex];
        // If close price is higher than topBand, buy
        if (priceDiff) {
          // Execute buy order
          console.log('paint buy')

          const shape = {
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: closeTime[i],
            y0: 0,
            x1: closeTime[i].getTime() + 1800000, // price timestamp + 30 min (next date point)
            y1: 1,
            fillcolor: '#d3d3d3',
            opacity: 0.2,
            line: {
              width: 0
            }
          }
          shapes.push(shape);
        }
        // If close price is lower than topBand, do nothing
      } else if (close < open) {
        // decrease (red)
        const bottomPriceDiff = close < bottomBand[bbIndex];
        // if close price is lower than bottomBand, sell
        if (bottomPriceDiff) {
          // Execute sell if funds have possession of this currency

          console.log('paint sell');

          const shape = {
            type: 'rect',
            xref: 'x',
            yref: 'paper',
            x0: closeTime[i],
            y0: 0,
            x1: closeTime[i].getTime() + 1800000, // price timestamp + 30 min (next date point)
            y1: 1,
            fillcolor: '#d3d3d3',
            opacity: 0.2,
            line: {
              width: 0
            }
          }
          shapes.push(shape);
        }
        // else do nothing
      }
    }
    return shapes;
  }

}
