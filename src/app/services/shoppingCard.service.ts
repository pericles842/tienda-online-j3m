import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cart_products = new BehaviorSubject<any[]>([]);
  cart_products$ = this.cart_products.asObservable();

  constructor() { }

  /**
   *Añadir un producto al carrito
   *
   * @param {*} product
   * @memberof ShoppingCartService
   */
  addToCart(product: any) {
    const items = this.cart_products.value;
    const existing = items.find((i) => i.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      product.quantity = 1;
      items.push(product);
    }

    this.cart_products.next([...items]);
  }

  /**
   *Eliminar un producto del carrito
   *
   * @param {number} id
   * @memberof ShoppingCartService
   */
  eliminateProduct(id: number) {
    const filtered = this.cart_products.value.filter((item) => item.id !== id);
    this.cart_products.next(filtered);
  }

  /**
   *Aumentar la cantidad de un producto en el carrito
   *
   * @param {number} id
   * @memberof ShoppingCartService
   */
  addAmount(id: number) {
    const items = this.cart_products.value;
    const product = items.find((item) => item.id === id);
    product.quantity += 1;
    this.cart_products.next(items);
  }

  /**
   *disminuir la cantidad de productos 
   *
   * @param {number} id
   * @memberof ShoppingCartService
   */
  subtractAmount(id: number) {
    const items = this.cart_products.value;
    const product = items.find((item) => item.id === id);

    //si el producto llega a 1 no permite quitarlo
    if (product.quantity === 1) return;
    product.quantity -= 1;
    this.cart_products.next(items);
  }

  clearCart() {
    this.cart_products.next([]);
  }

  getTotal() {
    return this.cart_products.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
