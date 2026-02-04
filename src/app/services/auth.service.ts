import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {
    private url = 'http://localhost:8080/api/auth';
    private http: HttpClient = inject(HttpClient);

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
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}