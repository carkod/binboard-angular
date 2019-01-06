import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StandardDeviationService } from './standard-deviation.service';
import { MovingAverageService } from './moving-average.service';
import { CandlestickToolsService } from './candlestick-tools.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    StandardDeviationService,
    MovingAverageService,
    CandlestickToolsService,
  ]
})
export class CandlestlickModule { }
