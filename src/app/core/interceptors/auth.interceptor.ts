import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthStore } from '../store/auth.store';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  // 1. Leemos el token del store
  const token = authStore.token();

  // 2. Si hay token, clonamos la petición añadiendo la cabecera
  // Las peticiones HTTP son inmutables en Angular, por eso hay que clonarla
  const authReq = token
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    : req;

  // 3. Dejamos pasar la petición (modificada o no) y vigilamos la respuesta
  return next(authReq).pipe(
    catchError((error) => {

      // 4. Si el servidor responde con 401, el token es inválido o ha expirado
      if (error instanceof HttpErrorResponse && error.status === 401) {
        // Limpiamos el estado de autenticación
        authStore.logout();
        // Mandamos al usuario al login
        router.navigate(['/login']);
      }

      // 5. Propagamos el error para que el componente también pueda manejarlo si quiere
      return throwError(() => error);
    })
  );
};
