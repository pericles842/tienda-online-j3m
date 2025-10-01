import { AuthService } from '@/services/auth.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ConfirmDialogModule],
  template: `<router-outlet></router-outlet> <p-confirmDialog></p-confirmDialog>`
})
export class AppComponent {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    /* 🔥 Si el token expira, mostrar modal es una suscripción 
    se puede ejecutar desde el interceptor o adguard*/
    this.authService.onSessionExpired().subscribe((expired) => {
      if (expired) {
        this.authService.showSessionExpiredModal();
      }
    });

    // 🔥 Si al recargar la app ya había un token, reprogramar countdown para dectatar el tiempo del token
    const token = this.authService.getToken();
    if (token) {
      const exp = this.authService.getTokenExpiration(token);
      this.authService['startExpirationCountdown'](exp);
    }
  }
}
