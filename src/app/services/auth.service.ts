import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Store } from "../store/store";
import { Router } from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
    private url = 'http://localhost:8080/api/auth';
    private http: HttpClient = inject(HttpClient);
    private store: Store = inject(Store);
    private router: Router = inject(Router);

    register(data: any) : Observable<any> {
        return this.http.post(`${this.url}/register`, data).pipe(
            tap((response: any) => {
              if (response.token) {
                localStorage.setItem('token', response.token);
              }
            })
        );
    }

    login(data: any): Observable<any> {
    return this.http.post(`${this.url}/login`, data).pipe(
      tap((res: any) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          localStorage.setItem('user', JSON.stringify(res.user));
          this.store.setState(res.user, res.token);
          this.router.navigate(['/subscriptions', res.user.id]);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    this.store.clearState();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}