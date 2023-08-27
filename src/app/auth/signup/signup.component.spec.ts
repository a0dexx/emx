import { ComponentFixture, TestBed } from '@angular/core/testing';

import { passwordMatchValidator, SignupComponent } from './signup.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signup']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, NoopAnimationsModule],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: MatSnackBar, useValue: snackBarSpy },
      ],
    });
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with empty fields', () => {
    expect(component.signupForm.value).toEqual({ email: '', password: '', confirmPassword: '' });
  });

  it('should be invalid when form fields are empty', () => {
    component.signupForm.patchValue({ email: '', password: '', confirmPassword: '' });
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should be valid when form fields are filled', () => {
    component.signupForm.patchValue({
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'password',
    });
    expect(component.signupForm.valid).toBeTruthy();
  });

  it('should call signup method when form is submitted with valid data', () => {
    const authService = TestBed.inject(AuthService);
    component.signupForm.patchValue({
      email: 'test@example.com',
      password: 'password',
      confirmPassword: 'password',
    });
    component.signup();
    expect(authService.signup).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should have a password match validator', () => {
    const formGroup = component.signupForm;

    formGroup.patchValue({
      password: 'password123',
      confirmPassword: 'password456',
    });

    expect(formGroup.hasError('passwordsNotMatch')).toBe(true);
  });

  it('should detect when passwords match', () => {
    const formGroup = component.signupForm;

    formGroup.patchValue({
      email: 'test@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    expect(formGroup.valid).toBe(true);
  });
});
