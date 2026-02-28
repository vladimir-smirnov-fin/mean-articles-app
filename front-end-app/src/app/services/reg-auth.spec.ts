import { TestBed } from '@angular/core/testing';

import { RegAuth } from './reg-auth';

describe('RegAuth', () => {
  let service: RegAuth;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegAuth);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
