import { Product } from '@/interfaces/product';
import { ConfigurationService } from '@/services/configuration.service';
import { ProductJ3mService } from '@/services/products.service';
import { ShoppingCartService } from '@/services/shoppingCard.service';
import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ImageModule } from 'primeng/image';
import { TabsModule } from 'primeng/tabs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [BreadcrumbModule, CommonModule, ImageModule, RouterLink, TabsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss'
})
export class ProductDetailComponent {
  @Input() product!: Product;
  @ViewChild('productContainer', { read: ViewContainerRef })
  products: Product[] = [];
  items: MenuItem[] = [
    { label: 'Hogar', routerLink: '/landing' },
    { label: 'Tienda', routerLink: '/shop' }
  ];

  constructor(
    private route: ActivatedRoute,
    private productJ3mService: ProductJ3mService,
    private shoppingCartService: ShoppingCartService,
    private viewContainer: ViewContainerRef,
    public configurationService: ConfigurationService
  ) {}

  /**
   * Generamos dinámicamente el componente para evitar la referencia circular
   *
   * @memberof ProductDetailComponent
   */
  async renderProductComponent() {
    //Buscamos el componente
    const { ProductComponent } = await import('../product/product');

    // Limpia el contenedor por si ya existían componentes
    this.viewContainer.clear();

    // Itera sobre los productos relacionados obtenidos por el servicio
    this.products.forEach((p) => {
      //creamos el componente
      const ref = this.viewContainer.createComponent(ProductComponent);
      //agregamos las clases para el grid
      ref.location.nativeElement.classList.add('col-span-3', 'md:col-span-6', 'lg:col-span-3');

      //asignamos el producto
      ref.instance.product = p;
    });
  }

  ngOnInit() {
    
    if (this.route.snapshot.paramMap.get('id')) {
      const id = this.route.snapshot.paramMap.get('id');
      this.productJ3mService.getProductsById(Number(id)).subscribe((product) => (this.product = product));
    }
    if (this.product) {
      this.items.push({ label: this.product.name });
    }
    // this.products = this.productJ3mService.getAllProducts().slice(0, 4);
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
