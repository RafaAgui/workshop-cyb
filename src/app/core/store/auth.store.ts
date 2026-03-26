import { computed, Injectable, signal, inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';

import { IntAuthState, IntUser } from '../models/auth.model';

const initialState: IntAuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
};

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly state = signal<IntAuthState>(this.loadFromStorage());

  readonly token = computed(() => this.state().token);
  readonly isAuthenticated = computed(() => this.state().isAuthenticated);
  readonly user = computed(() => this.state().user);

  private loadFromStorage(): IntAuthState {
    const saved = sessionStorage.getItem('auth_session');
    return saved ? JSON.parse(saved) : initialState;
  }

  setAuthentication(authData: IntAuthState): void {
    this.state.set(authData)
    sessionStorage.setItem('auth_session', JSON.stringify(authData));
  }

  setUser(user: IntUser): void {
    this.state.update((s) => ({ ...s, user }));
  }

  logout(): void {
    this.state.set(initialState);
    sessionStorage.removeItem('auth_session');
  }
}

export const authGuard = (): boolean | UrlTree => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  /* Si estás autenticado, te dejo pasar */
  if (authStore.isAuthenticated()) {
    return true;
  }

  /* En caso contrario te mando al login */
  return router.createUrlTree(['/login']);
};
