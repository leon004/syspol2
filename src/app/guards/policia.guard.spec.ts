import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { PoliciaGuard } from './policia.guard';
import { AuthService } from '../services/auth.service';

describe('PoliciaGuard', () => {
  let guard: PoliciaGuard;
  let authService: AuthService;
  let router: Router;
  let getUserRoleSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        PoliciaGuard
      ]
    });
    guard = TestBed.inject(PoliciaGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);

    // Crear un espía en el método getUserRole
    getUserRoleSpy = spyOn(authService, 'getUserRole');
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation for Policia and Admin roles', () => {
    getUserRoleSpy.and.returnValue('Policia');
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTrue();

    getUserRoleSpy.and.returnValue('Admin');
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeTrue();
  });

  it('should deny activation for other roles', () => {
    getUserRoleSpy.and.returnValue('User');
    spyOn(router, 'navigate');
    expect(guard.canActivate({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/access-denied-policia']);
  });
});
