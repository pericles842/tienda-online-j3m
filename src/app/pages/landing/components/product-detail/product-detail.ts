import { ProductJ3mService } from '@/services/products.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Button } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { TabsModule } from 'primeng/tabs';
import { ItemsButton } from '../items-button/items-button';
import { ProductComponent } from '../product/product';
import { ShoppingCartService } from '@/services/shoppingCard.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [BreadcrumbModule, CommonModule, Button, ImageModule, ProductComponent, TabsModule, ItemsButton],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetailComponent {
  @Input() product: any = {};
  products: any[] = [];
  items: MenuItem[] = [
    { label: 'Hogar', routerLink: '/landing' },
    { label: 'Tienda', routerLink: '/shop' }
  ];

  constructor(
    private route: ActivatedRoute,
    private productJ3mService: ProductJ3mService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit() {
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.product = this.productJ3mService.findProduct(Number(id));
    }

    if (this.product) {
      this.items.push({ label: this.product.name });
    }

    this.products = this.productJ3mService.getAllProducts().slice(0, 4);
  }

  addAmount(product: any) {
    product.quantity += 1;
  }
  subtractAmount(product: any) {
    if (product.quantity === 1) return;
    product.quantity -= 1;
  }
  addToCart(product: any) {
    this.shoppingCartService.addToCart(product);
  }
}
