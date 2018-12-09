import { TestBed, inject } from '@angular/core/testing';

import { AppLoadServiceService } from './app-load-service.service';

describe('AppLoadServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppLoadServiceService]
    });
  });

  it('should be created', inject([AppLoadServiceService], (service: AppLoadServiceService) => {
    expect(service).toBeTruthy();
  }));
});
