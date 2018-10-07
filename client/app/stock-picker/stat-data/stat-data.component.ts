import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import * as tf from '@tensorflow/tfjs';
import { DbService } from '../../services/db.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'stat-data',
  templateUrl: './stat-data.component.html',
  styleUrls: ['./stat-data.component.scss'],
  providers: [DatePipe]
})
export class StatDataComponent implements OnInit {

  @Input() symbol;
  @Output() givePrediction = new EventEmitter();
  @Input() interval: string;
  @ViewChild('price') price;

  linearModel: tf.Sequential;
  prediction: any;
  data;

  constructor(private db: DbService, private date: DatePipe) { }

  ngOnInit() {
    this.db.getCandlestick(this.symbol, this.interval, 50).subscribe(d => {
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
    this.linearModel.add(tf.layers.dense({ units: 128, inputShape:[1]}));
    this.linearModel.add(tf.layers.dense({ units: 128, inputShape:[128], activation: 'sigmoid'}));
    this.linearModel.add(tf.layers.dense({ units: 1, inputShape:[128]}));

    // Prepare the model for training: Specify the loss and the optimizer.
    this.linearModel.compile({ loss: 'binaryCrossentropy', optimizer: 'adam'});


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
