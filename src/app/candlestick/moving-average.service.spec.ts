import { TestBed, inject } from '@angular/core/testing';

import { MovingAverageService } from './moving-average.service';

describe('MovingAverageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovingAverageService]
    });
  });

  it('should be created', inject([MovingAverageService], (service: MovingAverageService) => {
    expect(service).toBeTruthy();
  }));
});
