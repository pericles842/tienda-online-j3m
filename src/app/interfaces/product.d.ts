import { UserTracking } from './user';

export interface Product extends UserTracking {
  id: number;
  name: string;
  // marca del producto
  brand: string;
  description: string;
  discount: number;
  reference: string;

  //costo del producto
  cost: number;
  price: number;
  stock: number;

  //cantidad del productos para la notification de reabastecer
  min_stock: number;
  category_id: number;
  name_category: string;

  status: StatusProduct;
  url_img?: string;

  type_product: ProductTemplateKeys;
  attributes: ProductAttributes<ProductTemplateKeys, productKeyGeneralAttributes>;

  created_at?: string;
  updated_at?: string;
}

export interface ProductAttributes<T, C = any> {
  id?: number;
  name: string;
  key: T;
  description: string;
  created_at: string;
  data?: DataProductAttributes;
  value?: UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct;
  attributes: ProductAttributes<C>[];
}

export type StatusProduct = 'active' | 'inactive' | 'damaged';

export type UnitsOfProduct = 'un' | 'mg' | 'oz' | 'lb' | 'kg' | 'lt' | 'ml' | 'g';
export type TallaProduct = 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
export type StyleClothesProduct = 'casual' | 'formal' | 'sport';
export type PharmaceuticalPresentationProduct =
  | 'tablets'
  | 'capsules'
  | 'syrup'
  | 'jarabe'
  | 'crema'
  | 'polvo'
  | 'gel'
  | 'pomada'
  | 'pasta'
  | 'liquido'
  | 'injectable';

export type DataProductAttributes = {
  key: UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct;
  value: string;
}[];

export type ProductTemplateKeys = 'food' | 'technology' | 'textile' | 'farmacia' | 'other';
export type productKeyGeneralAttributes =
  | 'color'
  | 'model'
  | 'storage'
  | 'talla'
  | 'gender'
  | 'style_clothes'
  | 'marca'
  | 'unit'
  | 'amount'
  | 'expiration_date'
  | 'manufacturer'
  | 'pharmaceutical_presentation';

export type ProductFormGroup = FormGroupControls<Product>;
