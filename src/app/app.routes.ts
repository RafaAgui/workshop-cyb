import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
  { path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.default)
  },
  {
    path: 'protected',
    canActivate: [authGuard],
    loadComponent: () => import('./features/protected/protected').then((m) => m.Protected),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
