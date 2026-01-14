import { ResponseDeleteResource } from '@/interfaces/forms';
import {
  DataProductAttributes,
  FormGroupTemplateAttributes,
  PharmaceuticalPresentationProduct,
  Product,
  ProductAttributes,
  ProductKeyGeneralAttributes,
  ProductStatusUpdate,
  ProductSupply,
  ProductTemplateKeys,
  StatusProduct,
  StyleClothesProduct,
  TallaProduct,
  UnitsOfProduct
} from '@/interfaces/product';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseCrudService } from './base-crud.service';

@Injectable({
  providedIn: 'root'
})
export class ProductJ3mService {
  constructor(
    private http: HttpClient,
    private baseCrudService: BaseCrudService
  ) {}

  getPublicProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.host}/public-products`);
  }
  getProductsById(id: number): Observable<Product> {
    return this.http.get<Product>(`${environment.host}/products/${id}`);
  }

  createProduct(product: FormData): Observable<Product> {
    return this.http.post<Product>(`${environment.host}/products`, product);
  }

  updateProduct(product: FormData): Observable<Product> {
    return this.http.put<Product>(`${environment.host}/products`, product);
  }
  getFullProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.host}/full-products`);
  }
  deleteProduct(id: number[]): Observable<ResponseDeleteResource> {
    return this.baseCrudService.eliminateResources('products', id);
  }

  updateStatusProduct(data: ProductStatusUpdate): Observable<Product> {
    return this.http.put<Product>(`${environment.host}/products-status`, { data: data });
  }

  supplyStock(product: ProductSupply): Observable<Product> {
    return this.http.put<Product>(`${environment.host}/products-supply-stock`, { data: product });
  }
  /**
   * Obtiene sub atributos  atributo de producto por su clave.
   *
   * @param {ProductAttributes} attribute - Atributo de producto.
   * @param {ProductKeyGeneralAttributes} key - Clave del atributo de producto.
   * @returns {data: DataProductAttributes, value: UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct | null, key: ProductTemplateKeys} - Atributo de producto con su valor y clave.
   */
  public getDataAttributeProduct(
    attribute: ProductAttributes,
    key: ProductKeyGeneralAttributes
  ): {
    data: DataProductAttributes;
    value: UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct | null;
    key: ProductTemplateKeys;
  } {
    let result: ProductAttributes = attribute.attributes.find((a) => a.key == key) as unknown as ProductAttributes;

    return {
      data: result.data as DataProductAttributes,
      value: result.value as UnitsOfProduct | TallaProduct | StyleClothesProduct | PharmaceuticalPresentationProduct | null,
      key: result.key
    };
  }

  generateTemplatesFormGroup(template: ProductTemplateKeys): FormGroup<FormGroupTemplateAttributes> {
    if (template === 'textile') {
      return new FormGroup<FormGroupTemplateAttributes>({
        color: new FormControl('#6466f1', { nonNullable: false, validators: [Validators.required] }),
        talla: new FormControl('s', { nonNullable: false, validators: [Validators.required] }),
        gender: new FormControl('male', { nonNullable: false, validators: [Validators.required] }),
        style_clothes: new FormControl('casual', { nonNullable: false, validators: [Validators.required] })
      });
    } else if (template === 'farmacia') {
      return new FormGroup<FormGroupTemplateAttributes>({
        manufacturer: new FormControl(null, { nonNullable: false, validators: [] }),
        pharmaceutical_presentation: new FormControl('tablets', { nonNullable: false, validators: [Validators.required] }),
        unit: new FormControl('g', { nonNullable: false, validators: [Validators.required] }),
        amount: new FormControl(null, { nonNullable: false, validators: [Validators.required] }),
        expiration_date: new FormControl(new Date(), { nonNullable: false, validators: [Validators.required] })
      });
    } else if (template === 'technology') {
      return new FormGroup<FormGroupTemplateAttributes>({
        color: new FormControl('#6466f1', { nonNullable: false, validators: [Validators.required] }),
        model: new FormControl(null, { nonNullable: false, validators: [] }),
        storage: new FormControl(null, { nonNullable: false, validators: [] })
      });
    } else if (template === 'food') {
      return new FormGroup<FormGroupTemplateAttributes>({
        marca: new FormControl(null, { nonNullable: false, validators: [Validators.required] }),
        unit: new FormControl('kg', { nonNullable: false, validators: [Validators.required] }),
        amount: new FormControl(null, { nonNullable: false, validators: [Validators.required] }),
        expiration_date: new FormControl(new Date(), { nonNullable: false, validators: [Validators.required] })
      });
    } else {
      return new FormGroup<FormGroupTemplateAttributes>({});
    }
  }

  getAllAttributesProduct(): Observable<ProductAttributes<ProductTemplateKeys, ProductKeyGeneralAttributes>[]> {
    return this.http.get<ProductAttributes<ProductTemplateKeys, ProductKeyGeneralAttributes>[]>(
      `${environment.host}/products-attributes`
    );
  }
}
