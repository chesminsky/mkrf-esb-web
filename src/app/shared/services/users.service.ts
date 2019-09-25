import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(
      private http: HttpClient
  ) { }

  getUsers() {
      return this.http.get(this.apiUrl + '/esb/adm/users');
  }
}
