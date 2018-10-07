import { TestBed, inject } from '@angular/core/testing';

import { LinearRegressionService } from './linear-regression.service';

describe('LinearRegressionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LinearRegressionService]
    });
  });

  it('should be created', inject([LinearRegressionService], (service: LinearRegressionService) => {
    expect(service).toBeTruthy();
  }));
});
