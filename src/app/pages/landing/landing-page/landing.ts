import { LayoutService } from '@/layout/service/layout.service';
import { ProductJ3mService } from '@/services/products.service';
import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { Home } from '../components/home/home';
import { ProductDetailComponent } from '../components/product-detail/product-detail';
import { ProductComponent } from '../components/product/product';
import { ScrollRevealAnimations } from '@/directives/scroll-reveal-animations';
import { Product } from '@/interfaces/product';
import { Skeleton } from 'primeng/skeleton';
import { LoadingService } from '@/services/loading.service';
import { ButtonCheckout } from "../components/button-checkout/button-checkout";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    ScrollRevealAnimations,
    RouterModule,
    RouterLink,
    RippleModule,
    StyleClassModule,
    ButtonModule,
    DividerModule,
    Home,
    ProductComponent,
    Skeleton,
    ButtonCheckout
],
  templateUrl: './landing.html'
})
export class Landing {
  products: Product[] = [];
  product_offer!: Product;
  constructor(
    public layoutService: LayoutService,
    public loadingService: LoadingService,
    private productJ3mService: ProductJ3mService
  ) {}

  ngOnInit() {
    this.productJ3mService.getPublicProducts().subscribe((products) => {
      this.products = products;

      this.product_offer = this.products.reduce(
        (previous, current) => ((previous.discount || 0) > (current.discount || 0) ? previous : current),
        this.products[0]
      );
    });
  }
}
