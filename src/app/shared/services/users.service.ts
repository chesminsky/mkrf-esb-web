import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(
      private http: HttpClient
  ) { }

  getUsers(): Observable<Array<User>> {
      return this.http.get<Array<User>>(this.apiUrl + '/esb/adm/users');
  }

  deleteUser(login: string) {
    return this.http.delete(this.apiUrl + '/esb/adm/users/' + login);
  }
}
