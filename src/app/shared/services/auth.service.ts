import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login({ username, password }) {
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(`${username}:${password}`)
    });
    return this.http.get('/esb/adm/login', { headers })
      .pipe(tap((resp: any) => {
        if (resp.token) {
          localStorage.setItem('auth', resp.token);
        }
      }));
  }

  public logout() {
    localStorage.removeItem('auth');
  }
}
