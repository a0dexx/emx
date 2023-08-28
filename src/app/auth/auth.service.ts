import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  user,
  GoogleAuthProvider,
} from '@angular/fire/auth';
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
  public user: any;

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        this.redirectAfterLogin();
      })
      .catch((error) => {
        this.presentSnackBar(error);
      });
  }

  signup(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then(() => {
        this.redirectAfterLogin();
      })
      .catch((error) => {
        this.presentSnackBar(error);
      });
  }

  googleLogin() {
    signInWithPopup(this.auth, new GoogleAuthProvider())
      .then((result) => {
        this.redirectAfterLogin();
      })
      .catch((error) => {
        this.presentSnackBar(error);
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

  presentSnackBar(error: any) {
    this.snackBar.open(`Signup failed: ${error.message} `, 'Dismiss', {
      duration: 5000,
    });
  }

  /*
   The reason for the setTimeout...
   When you log in the first time, the redirect works fine. If you logout and log back in, the redirect doesn't work.
   So adding the setTimeout fixes the issue. I don't believe this is the best solution.
   There is probably a better way to do this as this feels like a hack. And will investigate further when there is time.
   */
  redirectAfterLogin() {
    setTimeout(() => {
      this.router.navigate(['/characters'], { replaceUrl: false });
    }, 0);
  }

  logout() {
    this.auth.signOut().then(() => {
      this.isLoggedIn = false;
      this.router.navigateByUrl('/auth', { replaceUrl: true });
    });
  }
}
