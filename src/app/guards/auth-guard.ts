import { User } from '@/interfaces/user';
import { UserService } from '@/services/user.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    let token = this.userService.getToken();

    if (!token) {
      this.router.navigate(['/auth/login']);
      return of(false);
    }

    //Si el token expiro que se vuelva a loguear
    if (this.userService.isTokenExpired(token)) {
      console.log(this.userService.isTokenExpired(token));

      this.router.navigate(['/auth/login']);
      return of(false);
    }

    return this.checkAccess();
  }

  /**
   * Verifica si el token es válido y si el usuario tiene acceso a la ruta protegida por este guard
   * Si el token expira o el usuario no tiene acceso, se redirige a la ruta de login
   * Si el usuario tiene rol 6, se redirige a la ruta de landing
   * Si el usuario tiene cualquier otro rol, se permite el acceso a la ruta protegida
   * @returns {Observable<boolean>} observable que contiene un booleano indicando si el acceso es permitido o no
   */
  private checkAccess(): Observable<boolean> {
    const payload: { exp: number; iat: number; user: User } = this.userService.decodeToken();

    if (!payload) return of(false);

    // Rol 6 → landing
    if (payload.user.rol_id === 6) {
      this.router.navigate(['/landing']);
      return of(false);
    }

    // Otros roles → dashboard permitido
    return of(true);
  }
}
