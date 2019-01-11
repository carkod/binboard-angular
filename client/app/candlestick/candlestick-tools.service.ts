import { Injectable } from '@angular/core';
import { MovingAverageService } from './moving-average.service';

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

  annotation: Array<IAnnotation> = [];
  shapes: Array<any> = [];

  constructor(private ma: MovingAverageService) { }

  bollingerAnnotations(obj) {
    // const exampleDate = new Date('2019-01-05T04:59:59');
    const topBollinger = this.ma.updateTopBolliger(obj.closePrices, 7);
    const bottomBollinger = this.ma.updateBottomBolliger(obj.closePrices, 7);
    const prices = obj.openPrices;
    // prices.forEach((p, i) => {
    //   topBollinger.forEach(band => {
    //     if (+p > band) {
    //       const annotation: IAnnotation = {
    //         x: obj.closeTime[i],
    //         y: 1,
    //         xref: 'x',
    //         yref: 'paper',
    //         text: 'Resistance break, buy',
    //         font: { color: 'magenta' },
    //         showarrow: false,
    //         xanchor: 'right',
    //         ax: -50,
    //         ay: 0
    //       };
    //       this.annotation.push(annotation);
    //     }
    //   });
    //   // bottomBollinger.forEach(band => {
    //   //   if (+p < band) {
    //   //     const annotation: IAnnotation = {
    //   //       x: obj.closeTime[i],
    //   //       y: 1,
    //   //       xref: 'x',
    //   //       yref: 'paper',
    //   //       text: 'Support break, sell',
    //   //       font: { color: 'magenta' },
    //   //       showarrow: false,
    //   //       xanchor: 'right',
    //   //       ax: -50,
    //   //       ay: 0
    //   //     };
    //   //     this.annotation.push(annotation);
    //   //   }
    //   // })
    // });
    return this.annotation;
  }

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

  /**
   * Logic for bollinger bands strategy
   * Range uses 7 values to calculate moving averages and bands
   * Only use Top band, bottom band and compare it with open price and close price respectively
   */
  bolligerChecks(obj, range) {
    const topBollinger = this.ma.updateTopBolliger(obj.closePrices, range);
    const prices = obj.openPrices;

  }

  bollingerStrategy(obj) {
    const { closePrices, openPrices, closeTime } = obj;
    const range = 7;
    let annotations = [];
    let bbIndex = 0; // counter for Bollinger bands (length - range)
    for (let i = range - 1; i < closePrices.length; i++) {
      bbIndex++
      const close = Number(closePrices[i]);
      const open = Number(openPrices[i]);
      const topBand = this.ma.updateTopBolliger(closePrices, range);
      const bottomBand = this.ma.updateBottomBolliger(closePrices, range);
      if (close > open) {
        // Increase (green)
        const priceDiff = close - topBand[bbIndex];
        // If close price is higher than topBand, buy
        if (priceDiff > 0) {
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
          annotations.push(annotation);
        }
        // If close price is lower than topBand, do nothing
      } else if (close < open) {
        // decrease (red)
        const bottomPriceDiff = open - bottomBand[bbIndex];
        // if close price is lower than bottomBand, sell
        if (bottomPriceDiff < 0) {
          // Execute sell if funds have possession of this currency
          console.log('paint sell')
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
  topBandCheck(price, i) {
    // const topBand = this.maTopArray[i];
    // debugger;
    // return price - topBand;
  }
}
