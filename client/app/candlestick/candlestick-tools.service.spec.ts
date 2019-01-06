import { TestBed } from '@angular/core/testing';

import { CandlestickToolsService } from './candlestick-tools.service';

describe('CandlestickToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CandlestickToolsService = TestBed.get(CandlestickToolsService);
    expect(service).toBeTruthy();
  });
});
