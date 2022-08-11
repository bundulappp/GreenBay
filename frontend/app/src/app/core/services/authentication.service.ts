import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor() {}

  getToken(key: string): string {
    return localStorage.getItem(key) as string;
  }

  setToken(key: string, token: string): void {
    localStorage.setItem(key, token);
  }

  clearLocalStorage(): void {
    localStorage.clear();
  }
}
