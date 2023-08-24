import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword, user,
} from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private snackBar: MatSnackBar,
  ) {}

  login(email: string, password: string) {
    console.log('login', email, password);
    // return this.auth.signInWithEmailAndPassword(email, password);

    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...

        console.log('user', userCredential);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  async signup(email: string, password: string) {
    console.log('sign up', email, password);

    // return createUserWithEmailAndPassword(this.auth, email, password);

    //
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;
      console.log('user', userCredential);
    } catch (error) {
      console.log('error', error);
      this.snackBar.open('Signup failed', 'Dismiss', {
        duration: 5000,
      });
    }
  }

  getMyAuth() {
    return user(this.auth);
    // return this.auth;
  }

  logout() {
    this.auth.signOut();
  }
}
