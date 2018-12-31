import { TestBed } from '@angular/core/testing';

import { StandardDeviationService } from './standard-deviation.service';

describe('StandardDeviationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandardDeviationService = TestBed.get(StandardDeviationService);
    expect(service).toBeTruthy();
  });
});
