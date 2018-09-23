import { Component, OnInit, Input } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { ApiService } from '../../services/api.service';
import { DbService } from '../../services/db.service';

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
    this.linearModel.add(tf.layers.dense({ units: 1, inputShape: [1] }));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });


    // Training data, completely random stuff
    const xs = tf.tensor1d(this.data.closeTime);
    const ys = tf.tensor1d(this.data.closePrices);


    // Train
    await this.linearModel.fit(xs, ys)

    console.log('model trained!')
  }

  predict(val: number) {
    console.log(this.linearModel, val)
    const output = this.linearModel.predict(tf.tensor2d([val], [1, 1])) as any;
    this.prediction = Array.from(output.dataSync())[0]
  }
}
