export interface Product extends UserTracking {
  id: number;
  name: string;
  description: string;
  /**
   *Marca del producto
   *
   * @type {string}
   * @memberof Product
   */
  brand: string;
  color: string;
  discount: number;
  reference: string;
  price: number;

  /**
   *costo de adquisición
   *
   * @type {number}
   * @memberof Product
   */
  cost: number;
  stock: number;

  /**
   *stock mínimo permitido antes de reabastecer
   *
   * @type {number}
   * @memberof Product
   */
  min_stock: number;
  category_id: number;
  category: string;
  status: 'active' | 'inactive' | 'damaged';
  url_img: string;
  expiration_date: string;
}
