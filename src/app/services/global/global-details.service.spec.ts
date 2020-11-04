import { TestBed } from '@angular/core/testing';

import { GlobalDetailsService } from './global-details.service';

describe('GlobalDetailsService', () => {
  let service: GlobalDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
