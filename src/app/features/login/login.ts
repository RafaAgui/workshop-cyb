import { Component, signal, inject } from '@angular/core';
import { form, required, minLength, FormField  } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { AuthStore } from '../../core/store/auth.store'
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ FormField ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export default class Login {
  loginModel = signal({ user: '', password: ''});
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);
  private router = inject(Router);
  private authStore = inject(AuthStore);
  private authService = inject(AuthService);


  loginForm = form(this.loginModel, (schema) => {
    minLength(schema.password, 6, { message: 'Pass min 6 caracters' });
    required(schema.user, { message: 'user is required' });
    required(schema.password, { message: 'Password is required' });
  });


doLogin() {
  if (this.loginForm.user().invalid() || this.loginForm.password().invalid()) {
    return;
  }

  const credentials = {
    email: this.loginForm.user().value(),      // el campo 'user' contiene el email
    password: this.loginForm.password().value(),
  };

  this.authService.login(credentials).subscribe({
    next: (response) => {
      this.authStore.setAuthentication({
        token: response.access_token,
        isAuthenticated: true,
        user: {
          username: response.username,
          email: response.email,
        },
      });
      this.router.navigate(['/protected']);
    },
    error: (err) => {
        this.isLoading.set(false);
        // Mensaje genérico — no decimos si falló el usuario o la contraseña
        if (err.status === 401) {
          this.errorMessage.set('Credenciales incorrectas');
        } else {
          this.errorMessage.set('Error del servidor, inténtalo más tarde');
        }
      },
  });
}
}

