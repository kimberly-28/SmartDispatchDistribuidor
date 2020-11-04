import { TestBed } from '@angular/core/testing';

import { OrdersDetailsService } from './orders-details.service';

describe('OrdersDetailsService', () => {
  let service: OrdersDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
