import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [MatFormFieldModule, MatInputModule,ReactiveFormsModule,NoopAnimationsModule],
      providers: [

        FormBuilder,
        // { provide: AuthService, useValue: authServiceSpy },
        { provide: AuthService, useClass: MockAuthService  },
        { provide: MatSnackBar, useValue: snackBarSpy },

      ],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should initialize the form with empty fields', () => {
    expect(component.loginForm.value).toEqual({ email: '', password: '' });
  });

  it('should be invalid when form fields are empty', () => {
    component.loginForm.patchValue({ email: '', password: '' });
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should be valid when form fields are filled', () => {
    component.loginForm.patchValue({ email: 'test@example.com', password: 'password' });
    expect(component.loginForm.valid).toBeTruthy();
  });


  it('should call login method when form is submitted with valid data', () => {
    const authService = TestBed.inject(AuthService);
    spyOn(authService, 'login');
    component.loginForm.patchValue({ email: 'test@example.com', password: 'password' });
    component.login();
    expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password');
  });



});
class MockAuthService {
  login(email: string, password: string): void {
    // Mock implementation
  }
}
