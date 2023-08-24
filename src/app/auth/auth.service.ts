import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, user } from '@angular/fire/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  public isLoggedIn = false;

  login(email: string, password: string) {

    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        console.log('user', userCredential);
        this.router.navigateByUrl('/characters');
      })
      .catch((error) => {
        console.log('error', error);
        this.snackBar.open(`Signup failed: ${error.message} `, 'Dismiss', {
          duration: 5000,
        });
      });
  }

  signup(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.router.navigateByUrl('/characters');
      })
      .catch((error) => {
        console.log('error', error);
        this.snackBar.open(`Signup failed: ${error.message} `, 'Dismiss', {
          duration: 5000,
        });
      });
  }

  getMyAuth() {
    return user(this.auth).pipe(
      map((usr) => {
        if (usr) {
          this.isLoggedIn = true;
          return usr;
        }
        this.isLoggedIn = false;
        return null;
      }),
    );
  }

  logout() {
    this.isLoggedIn = false;
    this.auth.signOut();
    this.router.navigateByUrl('/auth');
  }
}
