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

  authUser(user: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.host}/users/authenticate`, user);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  setToken(token: string) {
    localStorage.setItem('accessToken', token);
  }
  setUser(user: LoginResponse['user']) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  isTokenExpired(token?: string): boolean {
    if (!token) token = this.getToken()!;
    if (!token) return true;
    return this.jwtHelper.isTokenExpired(token);
  }

  decodeToken(token?: string): any {
    if (!token) token = this.getToken()!;
    if (!token) return null;
    return this.jwtHelper.decodeToken(token);
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
