import { computed, Injectable, signal, inject } from '@angular/core';

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

  isAuthenticatedFromStorage(): boolean {
  const saved = sessionStorage.getItem('auth_session');
  return saved ? JSON.parse(saved).isAuthenticated : false;
}

  setUser(user: IntUser): void {
    this.state.update((s) => ({ ...s, user }));
  }

  logout(): void {
    this.state.set(initialState);
    sessionStorage.removeItem('auth_session');
  }
}


