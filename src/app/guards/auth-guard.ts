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

    // Si EL token expiró renovar
    if (this.userService.isTokenExpired(token)) {
      //!ESTE METODO REFRESCA EL TOKEN PEOR HAY QUE REVISARLO OR QUE DA ERRORES DE CORS
      // return this.userService.refreshToken().pipe(
      //   switchMap((newToken) => {
      //     if (!newToken) {
      //       this.router.navigate(['/landing']);
      //       return of(false);
      //     }
      //     return this.checkAccess();
      //   })
      // );
      localStorage.removeItem('user');
      localStorage.removeItem('accessToken');
      return this.checkAccess();
    }

    return this.checkAccess();
  }

  private checkAccess(): Observable<boolean> {
    const payload = this.userService.decodeToken();

    if (!payload) {
      this.router.navigate(['/landing']);
      return of(false);
    }

    const roleId = payload.role_id;

    // Rol 6 → landing
    if (roleId === 6) {
      this.router.navigate(['/landing']);
      return of(false);
    }

    // Otros roles → dashboard permitido
    return of(true);
  }
}
