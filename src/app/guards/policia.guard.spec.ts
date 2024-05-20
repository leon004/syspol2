import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { policiaGuard } from './policia.guard';

describe('policiaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => policiaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
