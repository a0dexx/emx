import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
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

  userDetail$!: Observable<any>;

  pictureUrl$!: Observable<string>;

  userName$!: Observable<string>;

  ngOnInit() {
    this.userDetail$ = this.authService.getMyAuth();
    this.isLoggedIn$ = this.authService.getMyAuth().pipe(map((user) => !!user));
    this.isLoggedOut$ = this.isLoggedIn$.pipe(map((loggedIn) => !loggedIn));
    this.pictureUrl$ = this.userDetail$.pipe(map((user) => (user ? user.photoURL : null)));
    this.userName$ = this.userDetail$.pipe(map((user) => user?.displayName || user?.email || null));
  }

  logout() {
    this.authService.logout();
  }
}
