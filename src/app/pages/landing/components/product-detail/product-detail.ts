import { Product, ProductKeyGeneralAttributes } from '@/interfaces/product';
import { ConfigurationService } from '@/services/configuration.service';
import { ProductJ3mService } from '@/services/products.service';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ImageModule } from 'primeng/image';
import { TabsModule } from 'primeng/tabs';
import { ButtonCheckout } from '../button-checkout/button-checkout';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [BreadcrumbModule, CommonModule, ImageModule, TabsModule, ButtonCheckout],
    templateUrl: './product-detail.html',
    styleUrl: './product-detail.scss'
})
export class ProductDetailComponent {
    @Input() product!: Product;
    @ViewChild('productContainer', { read: ViewContainerRef })
    products: Product[] = [];
    baseItems: MenuItem[] = [
        { label: 'Hogar', routerLink: '/landing' },
        { label: 'Tienda', routerLink: '/shop' }
    ];

    items: MenuItem[] = [];

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private productJ3mService: ProductJ3mService,
        private shoppingCartService: ShoppingCartService,
        private configurationService: ConfigurationService
    ) { }



    ngOnInit() {
        this.activatedRoute.paramMap.pipe(
            switchMap(params => {
                const id = Number(params.get('id'));
                return this.productJ3mService.getProductsById(id);
            })
        ).subscribe(product => {
            this.product = product;

            this.items = [
                ...this.baseItems,
                { label: product.name }
            ];
        });
    }

    getPriceDolarConfiguration() {
        return this.configurationService.getPriceDolarConfiguration();
    }

    calculatePriceForBs(price_of_dollar: number) {
        return this.configurationService.calculatePriceForBs(price_of_dollar);
    }

    getAttributesProduct(): [ProductKeyGeneralAttributes, string][] {
        if (typeof this.product.attributes == 'string') {
            this.product.attributes = JSON.parse(this.product.attributes);
        }
        return Object.entries(this.product.attributes) as [ProductKeyGeneralAttributes, string][];
    }

    labelAttributesSpanish(key: ProductKeyGeneralAttributes): string {
        const proprieties: Record<ProductKeyGeneralAttributes, string> = {
            color: 'Color',
            amount: 'Cantidad',
            unit: 'Unidad',
            manufacturer: 'Fabricante',
            model: 'Modelo',
            storage: 'Almacenamiento',
            expiration_date: 'Fecha de expiracion',
            talla: 'Talla',
            gender: 'Genero',
            pharmaceutical_presentation: 'Presentacion',
            marca: 'Marca',
            style_clothes: 'Estilo'
        };
        return proprieties[key];
    }

    addAmount(product: any) {
        product.quantity += 1;
    }
    subtractAmount(product: any) {
        if (product.quantity === 1) return;
        product.quantity -= 1;
    }
    addToCart(product: Product) {
        product.quantity = 1;
        this.shoppingCartService.addToCart(product);
    }

    redirectCheckout(item: Product) {
        this.addToCart(item);
        this.router.navigate(['/checkout']);
    }
}
