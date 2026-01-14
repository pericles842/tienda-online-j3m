import { LayoutService } from '@/layout/service/layout.service';
import { ProductJ3mService } from '@/services/products.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
    ProductComponent
  ],
  templateUrl: './landing.html'
})
export class Landing {
  products: Product[] = [];
  constructor(
    public layoutService: LayoutService,
    private productJ3mService: ProductJ3mService
  ) {}

  ngOnInit() {
    this.productJ3mService.getPublicProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
