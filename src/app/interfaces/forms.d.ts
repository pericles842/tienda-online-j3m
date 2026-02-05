import { FormControl, FormGroup } from '@angular/forms';
import {
  FormGroupTemplateAttributes,
  DataProductAttributes,
  ProductTemplateKeys,
  FormGroupTemplateAttributes,
  ProductAttributes,
  SubAttributesForTextile,
  UnitsOfProduct,
  TallaProduct,
  StyleClothesProduct,
  PharmaceuticalPresentationProduct,
  ProductKeyGeneralAttributes
} from './product';

export interface Column {
  style?: string;
  label: string;
  key: string;
  customExportHeader?: string;
  sortTable: boolean;
  dataType?: 'string' | 'number' | 'date' | 'boolean' | 'image' | 'private_image';
}

/**
 * Botones de acciones en la stablas dinamicas
 *
 * @export
 * @interface ActionTableButton
 */
export interface ActionTableButton {
  icon: string;
  tooltip?: string;
  severity: ButtonSeverity;
  rounded: boolean;
  outlined: boolean;
  method: (event: any) => void;
}

export type ButtonSeverity = 'primary' | 'secondary' | 'success' | 'info' | 'warn' | 'help' | 'danger' | 'contrast';

export type FormGroupControls<T> = {
  [K in keyof T]: FormControl<T[K]>;
};

/**
 * Tipado de las respuesta en el delete
 */
export type ResponseDeleteResource = { ids: number[] };

export interface ComponentTemplateAttributesProduct {
  formGroup: FormGroup<FormGroupTemplateAttributes>;
  attributes: ProductAttributes<ProductTemplateKeys, ProductKeyGeneralAttributes>;
  getDataAttributeProduct(
    attribute: ProductAttributes,
    key: ProductKeyGeneralAttributes
  ): {
    data: DataProductAttributes;
    value: UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct | null;
    key: ProductTemplateKeys;
  };
}
