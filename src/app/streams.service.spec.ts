import { TestBed, inject } from '@angular/core/testing';

import { StreamsService } from './streams.service';

describe('StreamsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StreamsService]
    });
  });

  it('should be created', inject([StreamsService], (service: StreamsService) => {
    expect(service).toBeTruthy();
  }));
});
