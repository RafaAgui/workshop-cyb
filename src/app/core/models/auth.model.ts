export interface IntUser {
  password: string;
  user: string;
}

export interface IntAuthState {
  token: string | null; // esto ya veremos para qué se usa
  isAuthenticated: boolean;
  user?: IntUser | null;
}
