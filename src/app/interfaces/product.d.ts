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

export interface ProductAttributes<T = ProductTemplateKeys, C = ProductKeyGeneralAttributes> {
  id?: number;
  name: string;
  key: T;
  description: string;
  data?: DataProductAttributes;
  value?: UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct;
  attributes: ProductAttributes<C>[];
  created_at: string;
}

export type StatusProduct = 'active' | 'inactive' | 'damaged';

//Tipos de unidades y datos generales
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

//Tipos de plantillas general
export type ProductTemplateKeys = 'food' | 'technology' | 'textile' | 'farmacia' | 'other';
export type ProductKeyGeneralAttributes =
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

//Sub propieades de plantillas
export type SubAttributesForTextile = Extract<ProductKeyGeneralAttributes, 'color' | 'talla' | 'gender' | 'style_clothes'>;
export type SubAttributesForFarmacia = Extract<
  ProductKeyGeneralAttributes,
  'manufacturer' | 'pharmaceutical_presentation' | 'amount' | 'unit' | 'expiration_date'
>;
export type SubAttributesForTechnology = Extract<ProductKeyGeneralAttributes, 'color' | 'model' | 'storage'>;
export type SubAttributesForFood = Extract<ProductKeyGeneralAttributes, 'marca' | 'unit' | 'amount' | 'expiration_date'>;

//Formularios reactivos
export type ProductFormGroup = FormGroupControls<Product>;
export interface FormGroupTemplateAttributes extends Partial<Record<ProductKeyGeneralAttributes, FormControl<string | null>>> {}

export interface TemplateAttributesProduct {
  key: ProductTemplateKeys;
  label: string;
  component: any;
  inputs: { [key: string]: any };
}
