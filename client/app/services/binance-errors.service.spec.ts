import { TestBed, inject } from '@angular/core/testing';

import { BinanceErrorsService } from './binance-errors.service';

describe('BinanceErrorsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BinanceErrorsService]
    });
  });

  it('should be created', inject([BinanceErrorsService], (service: BinanceErrorsService) => {
    expect(service).toBeTruthy();
  }));
});
