import { ProductJ3mService } from '@/services/products.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ProductComponent } from '../product/product';
import { Button } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { Badge } from 'primeng/badge';
import { ColorPickerModule } from 'primeng/colorpicker';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { StoreFilterSettings } from '../store-filter-settings/store-filter-settings';
import { LayoutService } from '@/layout/service/layout.service';
import { DrawerModule } from 'primeng/drawer';
import { ScrollRevealAnimations } from '@/directives/scroll-reveal-animations';
import { Product } from '@/interfaces/product';

@Component({
  selector: 'app-shop-products',
  imports: [
    Breadcrumb,
    AccordionModule,
    DrawerModule,
    ColorPickerModule,
    FormsModule,
    ProductComponent,
    SliderModule,
    ScrollRevealAnimations,
    StoreFilterSettings,
    Button
  ],
  templateUrl: './shop-products.html',
  styleUrl: './shop-products.scss'
})
export class ShopProducts {
  viewMenuFilter: WritableSignal<boolean> = signal(false);
  products: Product[] = [];
  items: MenuItem[] = [
    { label: 'Hogar', routerLink: '/landing' },
    { label: 'Tienda', routerLink: '/shop' }
  ];

  constructor(
    private productJ3mService: ProductJ3mService,
    public layoutService: LayoutService
  ) {}

  ngOnInit() {
    this.productJ3mService.getPublicProducts().subscribe((products) => {
      this.products = products;
    });
  }
}
