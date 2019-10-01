import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { UserAccessRights } from '../models/user-access-rights';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;

  constructor(
      private http: HttpClient
  ) { }

  public getUsers(): Observable<Array<User>> {
      return this.http.get<Array<User>>(`${this.apiUrl}/esb/adm/users`);
  }

  public deleteUser(cn: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/esb/adm/users/${cn}`);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/esb/adm/users/${user.cn}`, user);
  }

  public changePassword(cn: string, newPassword: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/esb/adm/users/${cn}/actions/change-user-password?newPassword=${newPassword}`, {});
  }

  public getAccessRights(cn: string): Observable<UserAccessRights> {
    return this.http.post<UserAccessRights>(`${this.apiUrl}/esb/adm/users/${cn}/actions/get-user-access-rights`, {});
  }

  public setAccessRights(cn: string, model: UserAccessRights): Observable<UserAccessRights> {
    return this.http.post<UserAccessRights>(`${this.apiUrl}/esb/adm/users/${cn}/actions/set-user-access-rights`, model);
  }
}
