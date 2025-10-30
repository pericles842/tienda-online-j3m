import { Component, signal, WritableSignal } from '@angular/core';
import { OverlayBadge } from 'primeng/overlaybadge';
import { DrawerModule } from 'primeng/drawer';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [OverlayBadge, DrawerModule, CommonModule],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {
  viewShoppingCard: WritableSignal<boolean> = signal(false);
  products: any[] = [];

  constructor(private shoppingCartService: ShoppingCartService) {}
  ngOnInit() {
    this.shoppingCartService.cart_products$.subscribe((items) => {
      this.products = items;
    });
  }
}
