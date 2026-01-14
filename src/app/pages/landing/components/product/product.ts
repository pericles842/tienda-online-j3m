import { Product } from '@/interfaces/product';
import { Loading } from '@/pages/loading/loading';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Component, Input, signal, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ImageModule } from 'primeng/image';
import { ProgressSpinner } from 'primeng/progressspinner';
import { TagModule } from 'primeng/tag';
import { ProductDetailComponent } from '../product-detail/product-detail';

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
    ProgressSpinner
  ],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class ProductComponent {
  @Input() product!: Product;
  modalViewProduct: WritableSignal<boolean> = signal(false);

  constructor(private shoppingCartService: ShoppingCartService) {}
  addToCart(product: Product, event: Event) {
    this.shoppingCartService.addToCart(product);
    event.stopPropagation();
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
