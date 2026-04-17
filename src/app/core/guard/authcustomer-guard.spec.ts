import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { authcustomerGuard } from './authcustomer-guard';

describe('authcustomerGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authcustomerGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
