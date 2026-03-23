import { Component, signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';
@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
loginModel = signal({ email: '', password: '' });

// El form "envuelve" al model y añade estado reactivo
loginForm = form(this.loginModel);
}
