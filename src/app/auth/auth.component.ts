import { Component } from '@angular/core';

import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {


  constructor(authService: Auth) {

  }
}
