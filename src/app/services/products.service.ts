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
  products = [
    {
      id: 1,
      name: 'Laptop Inovo',
      discount: 20,
      price: 120.1, // Ajuste para un precio más realista
      price_bs: 4323.6,
      stock: 10,
      quantity: 1,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'InovoTech',
      description: 'Portátil potente para trabajo y estudio, con 8GB de RAM y 256GB SSD.'
    },
    {
      id: 2,
      name: 'Smartphone Aurora X',
      discount: 15,
      price: 85.99,
      price_bs: 3095.64,
      stock: 25,
      quantity: 1,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'StellarCom',
      description: 'Teléfono inteligente con cámara de 48MP y batería de larga duración.'
    },
    {
      id: 3,
      name: 'Audífonos SoundBeat',
      discount: 5,
      price: 15.5,
      price_bs: 558.0,
      stock: 50,
      quantity: 1,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Accesorios',
      brand: 'AudioWave',
      description: 'Auriculares inalámbricos TWS con cancelación de ruido activa.'
    },
    {
      id: 4,
      name: 'Mouse Óptico Pro',
      discount: 10,
      price: 5.99,
      price_bs: 215.64,
      stock: 80,
      quantity: 1,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Accesorios',
      brand: 'TecnoGear',
      description: 'Ratón ergonómico de alta precisión con 5 botones programables.'
    },
    {
      id: 5,
      name: 'Tablet SketchPad',
      discount: 25,
      price: 69.99,
      price_bs: 2519.64,
      stock: 15,
      quantity: 1,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'DrawEasy',
      description: 'Tableta gráfica de 10 pulgadas con lápiz óptico sensible a la presión.'
    },
    {
      id: 6,
      name: 'Teclado Mecánico K1',
      discount: 0,
      price: 35.0,
      price_bs: 1260.0,
      stock: 30,
      quantity: 1,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Accesorios',
      brand: 'AlphaKeys',
      description: 'Teclado con switches mecánicos Outemu Blue y retroiluminación RGB.'
    },
    {
      id: 7,
      name: 'Bocina',
      discount: 12,
      price: 105.75,
      price_bs: 3807.0,
      stock: 5,
      quantity: 1,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'JBL',
      description: 'Bocina jbl'
    },
    {
      id: 8,
      name: 'Webcam StreamPro',
      discount: 18,
      price: 25.4,
      quantity: 1,
      price_bs: 914.4,
      stock: 40,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Accesorios',
      brand: 'VisionTech',
      description: 'Cámara web Full HD (1080p) con micrófono estéreo integrado.'
    },
    {
      id: 9,
      name: 'Monitor Curvo V32',
      discount: 20,
      quantity: 1,
      price: 199.99,
      price_bs: 7199.64,
      stock: 8,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Electrónica',
      brand: 'DisplayMax',
      description: 'Monitor de 32" curvo, 144Hz, ideal para gaming y multimedia.'
    },
    {
      id: 10,
      name: 'Disco Duro SSD 1TB',
      discount: 15,
      price: 45.99,
      quantity: 1,
      price_bs: 1655.64,
      stock: 20,
      url: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
      category: 'Componentes',
      brand: 'SpeedStorage',
      description: 'Unidad de estado sólido SATA III de 1TB para mejorar la velocidad del sistema.'
    }
  ];
  /**
   * Genera y descarga un PDF
   *
   * @param {string} url
   * @return {*}  {Observable<Blob>}
   * @memberof ProductService
   */
  getAllProducts(): any[] {
    return this.products;
  }

  findProduct(id: number) {
    return this.products.find((p) => p.id == id);
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
