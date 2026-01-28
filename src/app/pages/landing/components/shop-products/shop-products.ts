import { ProductJ3mService } from '@/services/products.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Product, ProductQuery, ProductResponse } from '@/interfaces/product';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
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

  totalPages = 0;
  currentPage = 1;
  limit = 10;

  items: MenuItem[] = [
    { label: 'Hogar', routerLink: '/landing' },
    { label: 'Tienda', routerLink: '/shop' }
  ];

  constructor(
    private productJ3mService: ProductJ3mService,
    public layoutService: LayoutService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.queryParams.pipe(
      switchMap(params => {
        const queryParams: ProductQuery = {
          search: params['q'] || '',
          page: params['page'] || 1,
          limit: params['limit'] || 10,
        };
        return this.productJ3mService.getProductsByQuery(queryParams);
      })
    ).subscribe({
      next: (res: ProductResponse) => {

        this.products = res.data;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;

      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }
  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page,
      },
      queryParamsHandling: 'merge'
    });
  }

  get pagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
