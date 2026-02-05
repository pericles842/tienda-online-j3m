import { ProductJ3mService } from '@/services/products.service';
import { Component, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Breadcrumb } from 'primeng/breadcrumb';
import { ProductComponent } from '../product/product';
import { Button } from 'primeng/button';
import { Paginator } from 'primeng/paginator';
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
    Button,
    Paginator
  ],
  templateUrl: './shop-products.html',
  styleUrl: './shop-products.scss'
})
export class ShopProducts {
  viewMenuFilter: WritableSignal<boolean> = signal(false);
  products: Product[] = [];

  totalPages = 0;
  currentPage = 1;
  limit = 12;

  // Paginador estilo Landing
  totalRecords = 0;
  first_paginator = 0;
  row_paginator = 12;

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
          limit: params['limit'] || this.row_paginator,
        };
        return this.productJ3mService.getProductsByQuery(queryParams);
      })
    ).subscribe({
      next: (res: ProductResponse) => {

        this.products = res.data;
        this.totalPages = res.totalPages;
        this.currentPage = res.currentPage;

        // Sincronizar datos para el p-paginator estilo Landing
        this.totalRecords = res.total;
        this.row_paginator = res.itemsPerPage ?? this.row_paginator;
        this.limit = this.row_paginator;
        this.first_paginator = (this.currentPage - 1) * this.row_paginator;

      },
      error: (err) => console.error('Error cargando productos', err)
    });
  }

  /**
   * Navegación por página usando botones numéricos / anterior / siguiente.
   */
  onPageChange(page: number) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        page: page,
        limit: this.row_paginator,
      },
      queryParamsHandling: 'merge'
    });
  }

  /**
   * Adaptador para el evento de PrimeNG Paginator.
   * Convierte first/rows en número de página (1-based) y reutiliza onPageChange.
   */
  onPrimePageChange(event: any) {
    this.first_paginator = event.first;
    this.row_paginator = event.rows;
    const newPage = Math.floor(this.first_paginator / this.row_paginator) + 1;
    this.onPageChange(newPage);
  }

  get pagesArray(): number[] {
    const totalVisible = 6;

    if (this.totalPages <= totalVisible) {
      return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }

    let endPage = this.currentPage + 1;
    let startPage = endPage - totalVisible + 1;

    if (startPage < 1) {
      startPage = 1;
      endPage = totalVisible;
    }

    if (endPage > this.totalPages) {
      endPage = this.totalPages;
      startPage = Math.max(1, endPage - totalVisible + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }
}
