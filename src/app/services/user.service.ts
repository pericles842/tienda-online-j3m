import { CreateUserTypeClient, LoginResponse, User } from '@/interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jwtHelper = new JwtHelperService();

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
    return this.http.post<User>(`${environment.host}/users/create`, user);
  }

  /**
   *Autenticar un usuario
   *
   * @param {{ email: string; password: string }} user
   * @return {*}  {Observable<LoginResponse>}
   * @memberof UserService
   */
  authUser(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.host}/users/authenticate`, user);
  }

  /**
   *Obtener el token del localstorage
   *
   * @return {string|null}
   * @memberof UserService
   */
  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  /**
   *Guardar el token en el localstorage
   *
   * @param {string} token
   * @memberof UserService
   */
  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  /**
   *Setear usuario en el localstorage
   *
   * @param {LoginResponse['user']} user
   * @memberof UserService
   */
  setUser(user: LoginResponse['user']) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   *Verificar si el token expiró
   *
   * @param {string} [token]
   * @return {*}  {boolean}
   * @memberof UserService
   */
  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken()!;
    if (!token) return true;
    return this.jwtHelper.isTokenExpired(token);
  }

  /**
   *Decodificar el token
   *
   * @param {string} [token]
   * @return {*}  {*}
   * @memberof UserService
   */
  decodeToken(token?: string): any {
    if (!token) token = this.getToken()!;
    if (!token) return null;
    return this.jwtHelper.decodeToken(token);
  }

  /**
   *Cerrar sesion
   *
   * @memberof UserService
   */
  logout() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
  }

  //!HAY UN PORBLEMA CON EL RFRES COKIE
  refreshToken(): Observable<string> {
    return this.http.post<LoginResponse>(environment.host + '/users/refreshToken', {}, { withCredentials: true }).pipe(
      map((res) => {
        this.setToken(res.accessToken); // guardamos el token
        this.setUser(res.user); //guardamos el usuario
        return res.accessToken; // devolvemos solo el string
      }),
      catchError((err) => {
        console.error('No se pudo renovar el token', err);
        return of(''); // devuelve string vacío si falla
      })
    );
  }
}
