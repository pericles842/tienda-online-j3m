import { AuthService } from '@/services/auth.service';
import { ConfigurationService } from '@/services/configuration.service';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-checkout',
  imports: [Breadcrumb, InputTextModule, TextareaModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  user: any;
  products: any[] = [];
  items: MenuItem[] = [
    { label: 'Hogar', routerLink: '/landing' },
    { label: 'Tienda', routerLink: '/shop' },
    { label: 'verificación ' }
  ];

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    public configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    this.shoppingCartService.cart_products$.subscribe((items) => {
      this.products = items;
    });

    this.user = this.authService.decodeToken().user;
  }
}
