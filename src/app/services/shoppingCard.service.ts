import { Product, ProprietiesShoppingCartStorage } from '@/interfaces/product';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private cart_products = new BehaviorSubject<Product[]>([]);
  cart_products$ = this.cart_products.asObservable();
  proprietiesShoppingCartStorage: ProprietiesShoppingCartStorage = 'shoppingCart';
  constructor() {
    this.cart_products.next(this.getShoppingCartLocalStorage());
  }

  private updateShoppingCartLocalStorage(item: Product[]) {
    localStorage.setItem(this.proprietiesShoppingCartStorage, JSON.stringify(item));
  }

  private getShoppingCartLocalStorage(): Product[] {
    return JSON.parse(localStorage.getItem(this.proprietiesShoppingCartStorage) || '[]');
  }

  /**
   *Añadir un producto al carrito
   *
   * @param {*} product
   * @memberof ShoppingCartService
   */
  addToCart(product: Product) {
    const items = this.cart_products.value;
    const existing = items.find((i) => i.id === product.id);

    if (existing) {
      existing.quantity = product.quantity;
    } else {
      items.push(product);
    }

    this.cart_products.next([...items]);
    this.updateShoppingCartLocalStorage(this.cart_products.value);
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
    this.updateShoppingCartLocalStorage(this.cart_products.value);
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

    if (product) {
      product.quantity += 1;
      this.cart_products.next(items);
      this.updateShoppingCartLocalStorage(this.cart_products.value);
    }
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

    if (product) {
      //si el producto llega a 1 no permite quitarlo
      if (product.quantity === 1) return;
      product.quantity -= 1;
      this.cart_products.next(items);
      this.updateShoppingCartLocalStorage(this.cart_products.value);
    }
  }

  cleanShoppingCard() {
    this.cart_products.next([]);
    this.updateShoppingCartLocalStorage(this.cart_products.value);
  }

  getTotal() {
    return this.cart_products.value.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }
}
