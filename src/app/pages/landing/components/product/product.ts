import { Component, Input, signal, WritableSignal } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProductDetailComponent } from '../product-detail/product-detail';
import { ImageModule } from 'primeng/image';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [TagModule, ButtonModule, RouterLink, ImageModule, DialogModule],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class ProductComponent {
  @Input() product: any;
  modalViewProduct: WritableSignal<boolean> = signal(false);

  addToCart(product: any, event: Event) {
    event.stopPropagation();
  }

  /**
   * Abre una ventana emergente con los detalles del producto.
   *
   * @param product - El producto que se va a mostrar.
   * @param event - El evento que se va a propagar.
   */
  viewProduct(product: any, event: Event) {
    event.stopPropagation();
    this.modalViewProduct.set(true);
  }
}
