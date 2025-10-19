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
   *
   *
   * @param {CreateUserTypeClient} user
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  createUser(user: CreateUserTypeClient): Observable<User> {
    return this.http.post<User>(`${environment.host}/users/create`, user);
  }

  /**
   *Crea un cliente servicio dedicado par ala pagina web
   *
   * @param {CreateUserTypeClient} user
   * @return {*}
   * @memberof UserService
   */
  createClient(user: CreateUserTypeClient) {
    return this.http.post<User>(`${environment.host}/users/create-client`, user);
  }

  deleteUser(id: number): Observable<number> {
    return this.http.delete<number>(`${environment.host}/users/delete/${id}`);
  }

  /**
   *Elimina un grupo de usuarios
   *
   * @param {number[]} ids
   * @return {*}  {Observable<{ ids_array: number[] }>}
   * @memberof UserService
   */
  deleteGroupUsers(id: number[]): Observable<{ ids_array: number[] }> {
    return this.http.delete<{ ids_array: number[] }>(`${environment.host}/users/delete-group`, { params: { id } });
  }

  /**
   *Edita un usuario
   *
   * @param {CreateUserTypeClient} user
   * @return {*}
   * @memberof UserService
   */
  updateUser(user: CreateUserTypeClient) {
    return this.http.put<User>(`${environment.host}/users/edit`, user);
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
