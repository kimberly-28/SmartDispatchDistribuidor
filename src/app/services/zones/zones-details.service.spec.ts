import { TestBed } from '@angular/core/testing';

import { ZonesDetailsService } from './zones-details.service';

describe('ZonesDetailsService', () => {
  let service: ZonesDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonesDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
