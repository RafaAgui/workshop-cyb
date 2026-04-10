import { Component, signal, inject } from '@angular/core';
import { form, required, minLength, FormField  } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthStore } from '../../core/store/auth.store'
import { IntUser } from '../../core/models/auth.model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormField ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class Login {
  loginModel = signal({ user: '', password: ''});
  authStore = inject(AuthStore);
  // authService = inject(AuthService)


  loginForm = form(this.loginModel, (schema) => {
    minLength(schema.password, 6, { message: 'Pass min 6 caracters' });
    required(schema.user, { message: 'user is required' });
    required(schema.password, { message: 'Password is required' });
  });
  router = inject(Router);;

  doLogin(): boolean {
    if (this.loginForm.user().invalid() || this.loginForm.password().invalid()) {
      console.log('error')
      return false;
    }

    // this.authService.login;
    const user: IntUser = {
      user: this.loginForm.user().value(),
      password: this.loginForm.password().value(),
    };


      this.authStore.setAuthentication({
        token: 'dummy-token',
        isAuthenticated: true,
        user
      });

      this.router.navigate(['/protected']);

      return true;
    }


  }


