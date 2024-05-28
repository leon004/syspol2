import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from './login.component';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a form with required fields', () => {
    const form = component.loginForm;
    expect(form.contains('usuario')).toBeTrue();
    expect(form.contains('password')).toBeTrue();
  });

  it('should make the usuario control required', () => {
    const control = component.loginForm.get('usuario');
    expect(control).not.toBeNull();
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalse();
      control.setValue('testUser');
      expect(control.valid).toBeTrue();
    }
  });

  it('should make the password control required', () => {
    const control = component.loginForm.get('password');
    expect(control).not.toBeNull();
    if (control) {
      control.setValue('');
      expect(control.valid).toBeFalse();
      control.setValue('testPassword');
      expect(control.valid).toBeTrue();
    }
  });

  it('should be invalid if form is empty', () => {
    component.loginForm.setValue({ usuario: '', password: '' });
    expect(component.loginForm.invalid).toBeTrue();
  });

  it('should be valid if form is filled', () => {
    component.loginForm.setValue({ usuario: 'testUser', password: 'testPassword' });
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should call the login method on form submit', () => {
    spyOn(authService, 'login').and.returnValue(of({ token: '123', user: { usuario: 'testUser', id: 1, rol: 'policia' } }));
    spyOn(router, 'navigate');

    component.loginForm.setValue({ usuario: 'testUser', password: 'testPassword' });
    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith({ usuario: 'testUser', password: 'testPassword' });
    expect(localStorage.getItem('token')).toBe('123');
    expect(localStorage.getItem('usuario')).toBe('testUser');
    expect(localStorage.getItem('policiaId')).toBe('1');
    expect(localStorage.getItem('rol')).toBe('policia');
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should handle authentication errors', () => {
    spyOn(authService, 'login').and.returnValue(throwError('Error'));
    component.loginForm.setValue({ usuario: 'testUser', password: 'testPassword' });
    component.onSubmit();
    expect(component.loginError).toBe('Credenciales incorrectas o error del servidor. Inténtalo de nuevo.');
  });
});
