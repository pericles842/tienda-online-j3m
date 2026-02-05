import { AuthService } from '@/services/auth.service';
import { LoadingService } from '@/services/loading.service';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Toast } from 'primeng/toast';
import { Loading } from '@/pages/loading/loading';
import { CommonModule } from '@angular/common';
import { LayoutService } from '@/layout/service/layout.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, ConfirmDialogModule, Toast, Loading, CommonModule],
  template: `<router-outlet></router-outlet>
    <p-toast />
    <p-confirmDialog></p-confirmDialog>
    <app-loading [loading]="loadingService.loading$ | async"></app-loading>`
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    public loadingService: LoadingService,
    public layoutService: LayoutService
  ) {}
  get isLoading$() {
    return this.loadingService.loading$;
  }

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

    // this.layoutService.configUpdate$.subscribe((config) => {
    //   console.log(config);
    //   if (config.darkTheme) {
    //        this.layoutService.layoutConfig.update((state) => ({ ...state, primary: 'noir' }));
    //   }
    // });

    // console.log(this.layoutService.isDarkTheme());
  }
  //noir
}
