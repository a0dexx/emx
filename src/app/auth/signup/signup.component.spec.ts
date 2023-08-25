import { ComponentFixture, TestBed } from '@angular/core/testing';

import { passwordMatchValidator, SignupComponent } from './signup.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

xdescribe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let formBuilder: FormBuilder;

  // let authService: AuthService;

  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    // const coursesServiceSpy = jasmine.createSpyObj('AuthService', ['findAllCourses']);

    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signup']);
    const snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [MatFormFieldModule, MatInputModule,ReactiveFormsModule,NoopAnimationsModule],
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

  // it('should call signup method when form is submitted with valid data', () => {
  //   spyOn(component.authService, 'signup');
  //
  //   component.signupForm.patchValue({ email: 'test@example.com', password: 'password', confirmPassword: 'password' });
  //   component.signup();
  //
  //   expect(component.authService.signup).toHaveBeenCalledWith('test@example.com', 'password');
  // });


  it('should detect when passwords match', () => {


    function createFormGroup(password: string, confirmPassword: string): FormGroup {
      return formBuilder.group(
        {
          password: [password, Validators.required],
          confirmPassword: [confirmPassword, Validators.required],
        },
        { validator: passwordMatchValidator }
      );
    }


    const formGroup = formBuilder.group({
      password: ['password', Validators.required],
      confirmPassword: ['password', Validators.required],
    }, { validator: passwordMatchValidator });

    expect(formGroup.valid).toBe(true);
  });

  it('should detect when passwords do not match', () => {
    const formGroup = formBuilder.group({
      password: ['password', Validators.required],
      confirmPassword: ['differentpassword', Validators.required],
    }, { validator: passwordMatchValidator });

    expect(formGroup.valid).toBe(false);
  });

});



class MockAuthService {
  signup(email: string, password: string): void {
    // Mock implementation
  }
}

class MockMatSnackBar {
  open(message: string, action: string): void {
    // Mock implementation
  }
}
