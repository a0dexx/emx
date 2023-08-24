import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validator: passwordMatchValidator },
    ); // Use the custom validator
  }

  signup() {
    if (this.signupForm.valid) {
      console.log('form is valid');
      const { email, password } = this.signupForm.value;
      this.authService.signup(email, password).then(res =>{
        console.log('result of signup then', res)
        // this.snackBar.open('Signup successful', 'Dismiss', {
        //   duration: 5000,
        // });
      })
      //   .catch(err =>{
      //   console.log('result of signup err', err)
      //     this.snackBar.open('Signup failed', 'Dismiss', {
      //     duration: 5000,
      //   });
      // })
      //

    }else{
      console.log('form is invalid');
    }

    console.log(this.signupForm.value);
  }
}

function passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password?.value !== confirmPassword?.value) {
    return { passwordsNotMatch: true };
  }
  return null;
}
