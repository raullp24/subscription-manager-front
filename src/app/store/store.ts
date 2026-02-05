import { BehaviorSubject } from 'rxjs';
import { AuthState, User } from './model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Store {
  private _state = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
  });

  constructor() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      this._state.next({
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
      });
    }
  }

  $state = this._state.asObservable();

  get state(): AuthState {
    return this._state.getValue();
  }

  setState(user: User, token: string): void {
    this._state.next({
      user: user,
      token: token,
      isAuthenticated: true,
    });
  }

  clearState(): void {
    this._state.next({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  }
}
