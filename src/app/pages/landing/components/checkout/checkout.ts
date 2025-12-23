import { PayMethodData } from '@/interfaces/pay_method';
import { AuthService } from '@/services/auth.service';
import { ConfigurationService } from '@/services/configuration.service';
import { PayMethodService } from '@/services/pay-method.service';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-checkout',
  imports: [Breadcrumb, InputTextModule, TextareaModule, CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss'
})
export class Checkout {
  user: any;
  products: any[] = [];
  pay_methods: WritableSignal<PayMethodData[]> = signal([]);
  activeMethod: number = 0;
  items: MenuItem[] = [
    { label: 'Hogar', routerLink: '/landing' },
    { label: 'Tienda', routerLink: '/shop' },
    { label: 'verificación ' }
  ];

  constructor(
    private authService: AuthService,
    private shoppingCartService: ShoppingCartService,
    public configurationService: ConfigurationService,
    private payMethodService: PayMethodService
  ) {}

  ngOnInit() {
    this.shoppingCartService.cart_products$.subscribe((items) => {
      this.products = items;
    });
    this.payMethodService.getPublicPayMethods().subscribe((res) => this.pay_methods.set(res));
    this.user = this.authService.decodeToken().user;
  }
}
