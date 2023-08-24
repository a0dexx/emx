import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { onAuthStateChanged, user } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'EMX test';

  constructor(private authService: AuthService) {}

  isLoggedIn$!: Observable<boolean>;

  isLoggedOut$!: Observable<boolean>;

  ngOnInit() {
    // this.authService.getAuth().then((res) => {
    //   console.log('result of getAuth then', res);
    // });

    // const ddd=  this.authService.getMyAuth()

    this.isLoggedIn$ = this.authService.getMyAuth().pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
  }

  logout() {
    this.authService.logout();
  }
}
