import { ConfigurationService } from '@/services/configuration.service';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-subtotal-shopingcart',
  imports: [CommonModule],
  templateUrl: './subtotal-shopingcart.html',
  styleUrl: './subtotal-shopingcart.scss'
})
export class SubtotalShopingcart {
  constructor(
    private shoppingCartService: ShoppingCartService,
    private configurationService: ConfigurationService
  ) {}

  getPriceDolarConfiguration() {
    return this.configurationService.getPriceDolarConfiguration();
  }

  calculatePriceForBs(price_of_dollar: number) {
    return this.configurationService.calculatePriceForBs(price_of_dollar);
  }

  getTotal() {
    return this.shoppingCartService.getTotal();
  }
}
