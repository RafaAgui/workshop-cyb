import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStore } from '../../core/store/auth.store';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.html',
})
export class Protected {
  private router = inject(Router);
  authStore = inject(AuthStore);

  doLogout() {
    // Limpiamos el store — borra token, usuario y estado de autenticación
    this.authStore.logout();
    // Mandamos al usuario al login
    this.router.navigate(['/login']);
  }
}
