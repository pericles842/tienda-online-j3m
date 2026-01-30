import { ScrollRevealAnimations } from '@/directives/scroll-reveal-animations';
import { Product, ProductQuery, ProductResponse } from '@/interfaces/product';
import { LayoutService } from '@/layout/service/layout.service';
import { LoadingService } from '@/services/loading.service';
import { ProductJ3mService } from '@/services/products.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Paginator } from "primeng/paginator";
import { RippleModule } from 'primeng/ripple';
import { Skeleton } from 'primeng/skeleton';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonCheckout } from "../components/button-checkout/button-checkout";
import { Home } from '../components/home/home';
import { ProductComponent } from '../components/product/product';

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
        ButtonCheckout,
        Paginator
    ],
    templateUrl: './landing.html'
})
export class Landing {
    products: Product[] = [];
    product_offer!: Product;

    totalRecords: number = 0;

    // Paginador
    first_paginator: number = 0; // Índice del primer registro
    row_paginator: number = 10; // Registros por página
    currentPage: number = 1;

    // Filtros
    filters: ProductQuery = {
        page: 1,
        limit: 10,
    };

    constructor(
        public layoutService: LayoutService,
        public loadingService: LoadingService,
        private productJ3mService: ProductJ3mService
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(): void {

        // Ajustamos los parámetros de paginación
        this.filters.page = this.currentPage;
        this.filters.limit = this.row_paginator;

        this.productJ3mService.getProductsByQuery(this.filters).subscribe({
            next: (res: ProductResponse) => {
                this.products = res.data;
                this.totalRecords = res.total; // total de registros para el paginador
                this.currentPage = res.currentPage;


                this.product_offer = this.products.reduce(
                    (previous, current) => ((previous.discount || 0) > (current.discount || 0) ? previous : current),
                    this.products[0]
                );
            },
            error: (err) => {
                console.error('Error al cargar productos', err);
            },
        });
    }

    onPageChange(event: any) {
        // event.first = índice del primer registro
        // event.rows = número de filas por página
        // Calculamos la página actual (1-based)
        this.first_paginator = event.first;
        this.row_paginator = event.rows;
        this.currentPage = Math.floor(this.first_paginator / this.row_paginator) + 1;

        this.loadProducts();
    }
}
