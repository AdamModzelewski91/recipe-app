import { TestBed } from '@angular/core/testing';

import { LoadingSpinnerService } from './loading-spinner.service';

describe('LoadingService', () => {
  let service: LoadingSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadingSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
