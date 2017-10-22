import { TestBed, inject } from '@angular/core/testing';

import { AiDataService } from './ai-data.service';

describe('AiDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AiDataService]
    });
  });

  it('should be created', inject([AiDataService], (service: AiDataService) => {
    expect(service).toBeTruthy();
  }));
});
