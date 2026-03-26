import { Component, signal, inject } from '@angular/core';
import { form, required, minLength, FormField  } from '@angular/forms/signals';
import { Router } from '@angular/router';

import { AuthStore } from '../../core/store/auth.store'
import { IntUser } from '../../core/models/auth.model';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormField ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginModel = signal({ email: '', password: '' });
  authStore = inject(AuthStore);


  loginForm = form(this.loginModel, (schema) => {
    minLength(schema.password, 8, { message: 'Pass min 8 caracters' });
    required(schema.email, { message: 'Email is required' });
    required(schema.password, { message: 'Password is required' });
  });
  router = inject(Router);;

  doLogin() {
    if (this.loginForm.email().invalid() || this.loginForm.password().invalid()) {
      console.log('error')
      return;
    }
    const user: IntUser = {
      email: this.loginForm.email().value(),
      username: this.loginForm.email().value(),
    };

    this.authStore.setAuthentication({
      token: 'dummy-token',
      isAuthenticated: true,
      user,
    });

    this.router.navigate(['/protected']);
  }
}
