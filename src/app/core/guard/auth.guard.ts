import { computed, inject } from '@angular/core';
import { AuthStore } from '../store/auth.store'
import { Router, RouterStateSnapshot } from '@angular/router';


export const authGuard = (state: RouterStateSnapshot) => {

  const authStore = inject(AuthStore);
  const router = inject(Router);

  if (!authStore.isAuthenticated()) {
    return router.createUrlTree(['/login'], {
      queryParams: { redirect: state.url }
    });
  }

  return true;
};

