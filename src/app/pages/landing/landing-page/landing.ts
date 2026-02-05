import { ScrollRevealAnimations } from '@/directives/scroll-reveal-animations';
import { Product } from '@/interfaces/product';
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
    // Productos de la página actual
    products: Product[] = [];
    private allProducts: Product[] = [];
    product_offer!: Product;

    totalRecords: number = 0;

    // Paginador (cliente)
    first_paginator: number = 0; // Índice del primer registro
    row_paginator: number = 10; // Registros por página

    constructor(
        public layoutService: LayoutService,
        public loadingService: LoadingService,
        private productJ3mService: ProductJ3mService
    ) { }

    ngOnInit() {
        this.loadProducts();
    }

    loadProducts(): void {
        // Sin optimización: traemos todos los productos públicos y paginamos en cliente
        this.productJ3mService.getPublicProducts().subscribe({
            next: (res: Product[]) => {
                this.allProducts = res;
                this.totalRecords = this.allProducts.length;

                // Definir producto en oferta sobre todo el catálogo
                if (this.allProducts.length > 0) {
                    this.product_offer = this.allProducts.reduce(
                        (previous, current) => ((previous.discount || 0) > (current.discount || 0) ? previous : current),
                        this.allProducts[0]
                    );
                }

                // Inicializar la primera página
                this.updatePage();
            },
            error: (err) => {
                console.error('Error al cargar productos', err);
            },
        });
    }

    /**
     * Actualiza el slice de productos mostrado según el estado del paginador.
     */
    private updatePage(): void {
        const start = this.first_paginator;
        const end = this.first_paginator + this.row_paginator;
        this.products = this.allProducts.slice(start, end);
    }

    onPageChange(event: any) {
        this.first_paginator = event.first;
        this.row_paginator = event.rows;

        // Solo actualizamos el slice en cliente, sin nuevas peticiones
        this.updatePage();
    }
}
