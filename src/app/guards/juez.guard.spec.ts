import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { juezGuard } from './juez.guard';

describe('juezGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => juezGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
