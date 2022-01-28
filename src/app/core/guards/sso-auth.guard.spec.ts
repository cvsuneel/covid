import { TestBed } from '@angular/core/testing';

import { SsoAuthGuard } from './sso-auth.guard';

describe('SsoAuthGuard', () => {
  let guard: SsoAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SsoAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
