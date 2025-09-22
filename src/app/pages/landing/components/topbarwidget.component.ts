import { Component } from '@angular/core';
import { StyleClassModule } from 'primeng/styleclass';
import { Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { AppFloatingConfigurator } from '@/layout/component/app.floatingconfigurator';

@Component({
  selector: 'topbar-widget',
  imports: [RouterModule, StyleClassModule, ButtonModule, RippleModule, AppFloatingConfigurator],
  template: `
    <a class="flex items-center mr-20" href="#">
      <img src="assets/images/logotipo.png" alt="logo" class="w-20" />
    </a>

    <div
      class="items-center bg-surface-0 dark:bg-surface-900 grow
     justify-between hidden lg:flex absolute lg:static w-full left-0 top-full px-12 lg:px-0 z-20 rounded-border"
    >
      <ul class="list-none p-0 m-0 flex lg:items-center select-none flex-col lg:flex-row cursor-pointer gap-8">
        <li>
          <a
            (click)="router.navigate(['/landing'], { fragment: 'home' })"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Hogar</span>
          </a>
        </li>
        <li>
          <a
            (click)="router.navigate(['/landing'], { fragment: 'features' })"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Categorías</span>
          </a>
        </li>
        <li>
          <a
            (click)="router.navigate(['/landing'], { fragment: 'highlights' })"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Productos</span>
          </a>
        </li>
        <li>
          <a
            (click)="router.navigate(['/landing'], { fragment: 'pricing' })"
            pRipple
            class="px-0 py-4 text-surface-900 dark:text-surface-0 font-medium text-xl"
          >
            <span>Cajas de ahorros</span>
          </a>
        </li>
      </ul>
      <div class="flex border-t lg:border-t-0 border-surface py-4 lg:py-0 mt-4 lg:mt-0 gap-2">
        <button pButton pRipple label="Ingresar" routerLink="/auth/login" [rounded]="true" [text]="true"></button>
        <button pButton pRipple label="Crear Cuenta" routerLink="/auth/register" [rounded]="true"></button>
        <app-floating-configurator [float]="false" />
      </div>
    </div>
  `
})
export class TopbarWidget {
  constructor(public router: Router) {}
}
