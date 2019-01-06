import { Injectable } from '@angular/core';

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

  constructor() { }

  bollingerAnnotations(obj: Object) {
    const exampleDate = new Date('2019-01-05T04:59:59');
    const annotation: IAnnotation = {
      x: exampleDate,
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
    return this.annotation.concat(annotation);
  }

  bollingerShapes(obj: Object) {
    const exampleDate = new Date('2019-01-05T04:59:59');
    const exampleDate1 = new Date('2019-01-05T05:29:59');
    const shapes = {
      type: 'rect',
      xref: 'x',
      yref: 'paper',
      x0: exampleDate,
      y0: 0,
      x1: exampleDate1,
      y1: 1,
      fillcolor: '#d3d3d3',
      opacity: 0.2,
      line: {
        width: 0
      }
    }
    return this.shapes.concat(shapes)
  }
}
