import { TestBed } from '@angular/core/testing';

import { ZoneDetailsService } from './zone-details.service';

describe('ZoneDetailsService', () => {
  let service: ZoneDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
