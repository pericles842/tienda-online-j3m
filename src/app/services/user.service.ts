import { CreateUserTypeClient, LoginResponse, User } from '@/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  /**
   *Crear un usuario
   *!NO ESTA VALIDADO SI CREA USUAIOS O CLIENTES
   *
   * @param {CreateUserTypeClient} user
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  createClient(user: CreateUserTypeClient): Observable<User> {
    return this.http.post<User>(`${environment.host}/users/create`, user, { withCredentials: true });
  }

  listUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.host}/users`);
  }

  /**
   *Autenticar un usuario
   *
   * @param {{ email: string; password: string }} user
   * @return {*}  {Observable<LoginResponse>}
   * @memberof UserService
   */
  authUser(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.host}/users/authenticate`, user, { withCredentials: true });
  }
}
