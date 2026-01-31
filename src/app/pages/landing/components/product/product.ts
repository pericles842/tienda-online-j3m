import { Product, StatusStock } from '@/interfaces/product';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { LoadingProducts } from '../loading-products/loading-products';
import { ProductDetailComponent } from '../product-detail/product-detail';
import { LoadingService } from '@/services/loading.service';
import { ConfigurationService } from '@/services/configuration.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-product',
    standalone: true,
    imports: [
        TagModule,
        ButtonModule,
        RouterLink,
        ImageModule,
        DialogModule,
        CommonModule,
        ProductDetailComponent,
        LoadingProducts,
        ProgressSpinner
    ],
    templateUrl: './product.html',
    styleUrl: './product.scss'
})
export class ProductComponent {
    @Input() loading: boolean | null = false;
    @Input() product!: Product;

    isLoading = true;
    finalUrl!: string;
    loadedClass = 'opacity-0';

    modalViewProduct: WritableSignal<boolean> = signal(false);

    constructor(
        private shoppingCartService: ShoppingCartService,
        public loadingService: LoadingService,
        private configurationService: ConfigurationService,
    ) { }

    ngOnInit() {
        if (this.product) {
            const img = new Image();
            img.src = this.product.url_img as string;

            img.onload = () => {
                this.finalUrl = this.product.url_img as string;
                this.isLoading = false;
                this.loadedClass = 'opacity-100';
            };

            img.onerror = () => {
                this.finalUrl = this.product.url_img as string;
                this.isLoading = false;
                this.loadedClass = 'opacity-100';
            };
        }
    }

    addToCart(product: Product, event: Event) {

        this.shoppingCartService.addToCart(product);
        event.stopPropagation();
    }

    calculatePriceForBs(price_for_dollar: number) {
        return this.configurationService.calculatePriceForBs(price_for_dollar);
    }

    calculateStock(stock: number, min_stock: number) {
        if (stock === 0) {
            return {
                label: 'No disponible',
                bgClass: 'bg-red-500',
                textClass: 'text-red-100'
            };
        }

        if (stock <= min_stock) {
            return {
                label: 'Unidades limitadas',
                bgClass: 'bg-yellow-600',
                textClass: 'text-yellow-100'
            };
        }

        return {
            label: 'Disponible',
            bgClass: 'bg-green-600',
            textClass: 'text-green-100'
        };
    }
    /**
     * Abre una ventana emergente con los detalles del producto.
     *
     * @param product - El producto que se va a mostrar.
     * @param event - El evento que se va a propagar.
     */
    viewProduct(product: Product, event: Event) {
        event.stopPropagation();
        this.modalViewProduct.set(true);
    }
}
