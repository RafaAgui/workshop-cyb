import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'home',
    loadComponent: () => import('./features/home/home').then((m) => m.Home)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then((m) => m.Login)
  },
  {
    path: 'protected',
    loadComponent: () => import('./features/protected/protected').then((m) => m.Protected)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];
