import { Injectable } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class LinearRegressionService {

  linearModel: tf.Sequential;
  xs: Array<any> = [];
  ys: Array<any> = [];
  volume: Array<any> = [];
  bestfit: Array<any> = [];
  private db: DbService;

  constructor(
    private symbol: string, 
    private interval: string,
    private limit: number,
    private data: any
    ) { 
  }

  async train() {

    // Define a model for linear regression.
    this.linearModel = tf.sequential();

    // const optimizer = tf.train.adam(0.03);
    this.linearModel.add(tf.layers.dense({units: 250, inputShape: [1]})); // layer 1
    this.linearModel.add(tf.layers.dense({units: 250, inputShape: [250]})); // layer 3
    this.linearModel.add(tf.layers.dense({units: 1, inputShape: [250]})); // output layer
    this.linearModel.compile({optimizer: 'adam', loss: 'meanSquaredError'}); // compile with params
    
    this.db.getCandlestick(this.symbol)
    // Training data
    const convertString = this.data.closePrices.map(Number);
    const convertTimeToNumber = this.data.closeTime.map(date => {
      return this.date.transform(date, 'yyyy-MM-dd');
    });
    // const xs = tf.tensor2d([537628399999, 1537630199999, 1537631999999, 1537633799999], [50, 1]);
    // const ys = tf.tensor2d([0.00238173, 0.0023151, 0.0023555, 0.00233285], [50, 1]);

    const xs = tf.tensor1d(convertTimeToNumber);
    const ys = tf.tensor1d(convertString);

    // console.log(xs, ys)

    // Train
    await this.linearModel.fit(xs, ys, {
      batchSize: 5,
      epochs: 125,
    })

    console.log('model trained!')
  }

  predict() {
    const { value } = this.price.nativeElement;
    
    let currentDay = new Date();
    currentDay.setDate(currentDay.getDate() + 1);
    // const output = this.linearModel.predict(tf.tensor2d([val], [1, 1])) as any;
    const closePrices = [];
    closePrices.push(+value);
    const incrementDay = this.date.transform(currentDay, 'yyyy-MM-dd');

    const output = this.linearModel.predict(tf.tensor([0.002, 0.004, 0.005, 0.0055], [4, 1])) as any;
    console.log(this.linearModel)
    const result = Array.from(output.dataSync());
    console.log(result, incrementDay);

    this.givePrediction.emit(result);
    
  }
}
