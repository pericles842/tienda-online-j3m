import { Component, signal, WritableSignal } from '@angular/core';
import { OverlayBadge } from 'primeng/overlaybadge';
import { DrawerModule } from 'primeng/drawer';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Button } from 'primeng/button';
import { ItemsButton } from '../items-button/items-button';
import { Router, RouterLink } from '@angular/router';
import { Product } from '@/interfaces/product';
import { ConfigurationService } from '@/services/configuration.service';
import { SubtotalShopingcart } from "../subtotal-shopingcart/subtotal-shopingcart";
import { ButtonCheckout } from "../button-checkout/button-checkout";

@Component({
  selector: 'app-shopping-cart',
  imports: [OverlayBadge, DrawerModule, CommonModule, Button, ItemsButton, SubtotalShopingcart, ButtonCheckout],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.scss'
})
export class ShoppingCart {
  viewShoppingCard: WritableSignal<boolean> = signal(false);
  products: Product[] = [];

  constructor(
    private shoppingCartService: ShoppingCartService,
    private configurationService: ConfigurationService,
    private router: Router
  ) {}
  ngOnInit() {
    this.shoppingCartService.cart_products$.subscribe((items) => {
      this.products = items;
    });
  }

  getPriceDolarConfiguration() {
    return this.configurationService.getPriceDolarConfiguration();
  }

  calculatePriceForBs(price_of_dollar: number) {
    return this.configurationService.calculatePriceForBs(price_of_dollar);
  }

  addAmount(id: number) {
    this.shoppingCartService.addAmount(id);
  }
  subtractAmount(id: number) {
    this.shoppingCartService.subtractAmount(id);
  }

  deleteProductInCard(id: number) {
    this.shoppingCartService.eliminateProduct(id);
  }

  getTotal() {
    return this.shoppingCartService.getTotal();
  }

  cleanShoppingCard() {
    this.shoppingCartService.cleanShoppingCard();
  }
}
