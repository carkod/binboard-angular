import { Component, OnInit, Input } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { ApiService } from '../../services/api.service';
import { DbService } from '../../services/db.service';
import { flatten } from '@tensorflow/tfjs-layers/dist/exports_layers';

@Component({
  selector: 'stat-data',
  templateUrl: './stat-data.component.html',
  styleUrls: ['./stat-data.component.scss']
})
export class StatDataComponent implements OnInit {

  @Input() symbol;

  linearModel: tf.Sequential;
  prediction: any;
  data;

  constructor(private db: DbService) { }

  ngOnInit() {
    this.db.getCandlestick(this.symbol, '30m', 50).subscribe(d => {
      console.log(d)
      this.data = d;
      this.train();
    }, error => {
      console.error('candlestick data error: ', error)
    });
    
  }


  async train() {
    // Define a model for linear regression.
    this.linearModel = tf.sequential();
    // this.linearModel.add(flatten())
    this.linearModel.add(tf.layers.dense({ units: 1, inputShape: [2] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });


    // Training data
    const convertString = this.data.closePrices.map(Number);
    const convertTimeToNumber = this.data.closeTime.map(date => date.getTime())
    // const xs = tf.tensor2d([537628399999, 1537630199999, 1537631999999, 1537633799999], [50, 1]);
    // const ys = tf.tensor2d([0.00238173, 0.0023151, 0.0023555, 0.00233285], [50, 1]);

    const xs = tf.tensor(convertTimeToNumber);
    const ys = tf.tensor(convertString);

    console.log(xs, ys)

    // Train
    await this.linearModel.fit(xs, ys)

    console.log('model trained!')
  }

  predict(val: Array<number>) {
    // const output = this.linearModel.predict(tf.tensor2d([val], [1, 1])) as any;
    const currentTime = new Date().getTime();
    const currentPrice = 0.024;
    const predictArray = [currentTime, currentPrice]
    const output = this.linearModel.predict(tf.tensor(predictArray)) as any;
    console.log(Array.from(output.dataSync()))
    // this.prediction = Array.from(output.dataSync())[0]
    
  }
}
