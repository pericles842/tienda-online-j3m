import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';

@Component({
  selector: 'app-checkout',
  imports: [Breadcrumb],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  items: MenuItem[] = [
    { label: 'Hogar', routerLink: '/landing' },
    { label: 'Tienda', routerLink: '/shop' },
    { label: 'verificación ' }
  ];
}
