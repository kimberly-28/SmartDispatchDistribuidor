import { TestBed } from '@angular/core/testing';

import { NotificationsReportsService } from './notifications-reports.service';

describe('NotificationsReportsService', () => {
  let service: NotificationsReportsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationsReportsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
