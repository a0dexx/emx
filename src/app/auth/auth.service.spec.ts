import { TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Auth, provideAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { of } from 'rxjs';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../../environments/environment';

describe('AuthService', () => {
  let service: AuthService;
  let authMock: any;
  let snackBarMock: MatSnackBar;
  let routerMock: Router;

  const firebaseConfig = {
    projectId: 'contractors-4b71a',
    appId: '1:785307663367:web:8a642a3f892be0aaa37ea2',
    databaseURL: 'https://contractors-4b71a.firebaseio.com',
    storageBucket: 'contractors-4b71a.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyBfrWgo0aZFLDhQSeoXP6xeyqc8KTdDcbQ',
    authDomain: 'contractors-4b71a.firebaseapp.com',
    messagingSenderId: '785307663367',
    measurementId: 'G-WBZ4FCDKEE',
  };

  beforeEach(waitForAsync(() => {
    authMock = {
      signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword'),
      createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword'),
      user: jasmine.createSpy('user').and.returnValue(of(null)),
      signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve()),
    };
    snackBarMock = jasmine.createSpyObj('MatSnackBar', ['open']);
    routerMock = jasmine.createSpyObj('Router', ['navigateByUrl']);

    TestBed.configureTestingModule({
      imports: [provideFirebaseApp(() => initializeApp(environment.firebase)), provideAuth(() => authMock)],
      providers: [
        { provide: Auth, useValue: authMock },
        { provide: MatSnackBar, useValue: snackBarMock },
        { provide: Router, useValue: routerMock },
      ],
    });

    service = TestBed.inject(AuthService);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  xit('should log in', fakeAsync(() => {
    tick(2000);
    const email = 'test@example.com';
    const password = 'password123';
    authMock.signInWithEmailAndPassword.and.returnValue(Promise.resolve({}));
    service.login(email, password);
    tick();
    expect(authMock.signInWithEmailAndPassword).toHaveBeenCalledWith(email, password);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/characters');
  }));
});
