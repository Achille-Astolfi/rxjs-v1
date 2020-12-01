import { TestBed } from '@angular/core/testing';

import { UmanaRestService } from './umana-rest.service';

describe('UmanaRestService', () => {
  let service: UmanaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UmanaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
