import { CreateCharge, SimpleCharge } from '@/interfaces/charges';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cart_products = new BehaviorSubject<any[]>([]);
  cart_products$ = this.cart_products.asObservable();

  constructor() {}

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
      existing.quantity += product.quantity;
    } else {
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

  clearCart() {
    this.cart_products.next([]);
  }

  getTotal() {
    return this.cart_products.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
