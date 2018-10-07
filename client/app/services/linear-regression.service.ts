import { Injectable, Output } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { DbService } from './db.service';

@Injectable({
  providedIn: 'root'
})
export class LinearRegressionService {

  @Output() givePrediction;
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
    
    // Fit data
    await this.linearModel.fit(tf.tensor(this.xs), tf.tensor(this.ys), {
      epochs: 200
    })
    .then(() => {
      const bestfit = this.linearModel.predict(tf.tensor(this.xs, [this.xs.length, 1])) as any;
      this.bestfit = Array.from(bestfit.dataSync());
          // evaluate = model.evaluate(tf.tensor(xs, [xs.length, 1]));
          console.log(this.bestfit);
    });
    console.log('model trained!');
  }

  predict() {
    this.data.forEach((element, i) => {
        this.xs.push(i++);
        this.ys.push(+element[4]);
    });

    const output = this.linearModel.predict(tf.tensor([0.002, 0.004, 0.005, 0.0055], [4, 1])) as any;
    const result = Array.from(output.dataSync());
    this.givePrediction.emit(result);
    
  }
}
