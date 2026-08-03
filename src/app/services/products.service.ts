import { ResponseDeleteResource } from '@/interfaces/forms';
import {
    DataProductAttributes,
    FormGroupTemplateAttributes,
    PharmaceuticalPresentationProduct,
    Product,
    ProductAttributes,
    ProductKeyGeneralAttributes,
    ProductQuery,
    ProductResponse,
    ProductStatusUpdate,
    ProductSupply,
    ProductTemplateKeys,
    StyleClothesProduct,
    TallaProduct,
    UnitsOfProduct
} from '@/interfaces/product';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { BaseCrudService } from './base-crud.service';
import { CategoriesService } from './categories.service';

const UNIT_OPTIONS: DataProductAttributes = [
    { key: 'un', value: 'Unidad' },
    { key: 'kg', value: 'Kilogramo' },
    { key: 'g', value: 'Gramo' },
    { key: 'lb', value: 'Libra' },
    { key: 'oz', value: 'Onza' },
    { key: 'lt', value: 'Litro' },
    { key: 'ml', value: 'Mililitro' },
    { key: 'mg', value: 'Miligramo' }
];

const TALLA_OPTIONS: DataProductAttributes = [
    { key: 's', value: 'S' },
    { key: 'm', value: 'M' },
    { key: 'l', value: 'L' },
    { key: 'xl', value: 'XL' },
    { key: 'xxl', value: 'XXL' },
    { key: 'xxxl', value: 'XXXL' }
];

const STYLE_CLOTHES_OPTIONS: DataProductAttributes = [
    { key: 'casual', value: 'Casual' },
    { key: 'formal', value: 'Formal' },
    { key: 'sport', value: 'Deportivo' }
];

const PHARMACEUTICAL_PRESENTATION_OPTIONS: DataProductAttributes = [
    { key: 'tablets', value: 'Tabletas' },
    { key: 'capsules', value: 'Cápsulas' },
    { key: 'syrup', value: 'Jarabe' },
    { key: 'crema', value: 'Crema' },
    { key: 'polvo', value: 'Polvo' },
    { key: 'gel', value: 'Gel' },
    { key: 'pomada', value: 'Pomada' },
    { key: 'pasta', value: 'Pasta' },
    { key: 'liquido', value: 'Líquido' },
    { key: 'injectable', value: 'Inyectable' }
];

const GENDER_OPTIONS = [
    { key: 'male', value: 'Masculino' },
    { key: 'female', value: 'Femenino' },
    { key: 'unisex', value: 'Unisex' }
] as unknown as DataProductAttributes;

const NOW = new Date().toISOString();

const ATTRIBUTES_CATALOG: ProductAttributes<ProductTemplateKeys, ProductKeyGeneralAttributes>[] = [
    {
        id: 1,
        name: 'Alimentos',
        key: 'food',
        description: 'Atributos para productos alimenticios',
        created_at: NOW,
        attributes: [
            { name: 'Unidad de medida', key: 'unit', description: 'Unidad de medida del producto', data: UNIT_OPTIONS, attributes: [], created_at: NOW }
        ]
    },
    {
        id: 2,
        name: 'Farmacia',
        key: 'farmacia',
        description: 'Atributos para productos farmacéuticos',
        created_at: NOW,
        attributes: [
            { name: 'Unidad de medida', key: 'unit', description: 'Unidad de medida del producto', data: UNIT_OPTIONS, attributes: [], created_at: NOW },
            {
                name: 'Presentación',
                key: 'pharmaceutical_presentation',
                description: 'Presentación del producto farmacéutico',
                data: PHARMACEUTICAL_PRESENTATION_OPTIONS,
                attributes: [],
                created_at: NOW
            }
        ]
    },
    {
        id: 3,
        name: 'Textil',
        key: 'textile',
        description: 'Atributos para productos textiles',
        created_at: NOW,
        attributes: [
            { name: 'Talla', key: 'talla', description: 'Talla del producto', data: TALLA_OPTIONS, attributes: [], created_at: NOW },
            { name: 'Género', key: 'gender', description: 'Género del producto', data: GENDER_OPTIONS, attributes: [], created_at: NOW },
            { name: 'Estilo', key: 'style_clothes', description: 'Estilo de ropa', data: STYLE_CLOTHES_OPTIONS, attributes: [], created_at: NOW }
        ]
    },
    {
        id: 4,
        name: 'Tecnología',
        key: 'technology',
        description: 'Atributos para productos tecnológicos',
        created_at: NOW,
        attributes: []
    },
    {
        id: 5,
        name: 'Otro',
        key: 'other',
        description: 'Atributos genéricos',
        created_at: NOW,
        attributes: []
    }
];

const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        name: 'Arroz Mary 1kg',
        brand: 'Mary',
        description: 'Arroz blanco de grano largo',
        discount: 0,
        reference: 'ALM-001',
        cost: 0.8,
        price: 1.2,
        stock: 120,
        quantity: 0,
        min_stock: 20,
        category_id: 1,
        category_name: 'Alimentos',
        status: 'active',
        url_img: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
        type_product: 'food',
        attributes: { marca: 'Mary', unit: 'kg', amount: 1, expiration_date: '2026-12-01' } as any,
        created_at: '2025-01-20',
        updated_at: '2025-01-20',
        user_create_id: 1,
        user_update_id: 1,
        email_user_create: 'admin@tiendademo.com',
        email_user_update: 'admin@tiendademo.com'
    },
    {
        id: 2,
        name: 'Refresco Cola 2L',
        brand: 'Cola Real',
        description: 'Bebida gaseosa sabor cola',
        discount: 0,
        reference: 'BEB-002',
        cost: 1.1,
        price: 1.8,
        stock: 8,
        quantity: 0,
        min_stock: 15,
        category_id: 2,
        category_name: 'Bebidas',
        status: 'active',
        url_img: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
        type_product: 'food',
        attributes: { marca: 'Cola Real', unit: 'lt', amount: 2, expiration_date: '2026-06-15' } as any,
        created_at: '2025-01-22',
        updated_at: '2025-01-22',
        user_create_id: 1,
        user_update_id: 1,
        email_user_create: 'admin@tiendademo.com',
        email_user_update: 'admin@tiendademo.com'
    },
    {
        id: 3,
        name: 'Smartphone Galaxy A15',
        brand: 'Samsung',
        description: 'Smartphone gama media 128GB',
        discount: 5,
        reference: 'TEC-003',
        cost: 150,
        price: 199.99,
        stock: 30,
        quantity: 0,
        min_stock: 5,
        category_id: 4,
        category_name: 'Celulares',
        status: 'active',
        url_img: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
        type_product: 'technology',
        attributes: { color: '#1f2937', model: 'Galaxy A15', storage: '128' } as any,
        created_at: '2025-02-01',
        updated_at: '2025-02-01',
        user_create_id: 1,
        user_update_id: 1,
        email_user_create: 'admin@tiendademo.com',
        email_user_update: 'admin@tiendademo.com'
    },
    {
        id: 4,
        name: 'Franela Casual Unisex',
        brand: 'Tienda Demo Wear',
        description: 'Franela de algodón 100%',
        discount: 0,
        reference: 'ROP-004',
        cost: 4,
        price: 8.5,
        stock: 60,
        quantity: 0,
        min_stock: 10,
        category_id: 5,
        category_name: 'Ropa',
        status: 'active',
        url_img: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
        type_product: 'textile',
        attributes: { color: '#2563eb', talla: 'm', gender: 'unisex', style_clothes: 'casual' } as any,
        created_at: '2025-02-05',
        updated_at: '2025-02-05',
        user_create_id: 1,
        user_update_id: 1,
        email_user_create: 'admin@tiendademo.com',
        email_user_update: 'admin@tiendademo.com'
    },
    {
        id: 5,
        name: 'Acetaminofén 500mg',
        brand: 'Genven',
        description: 'Analgésico y antipirético',
        discount: 0,
        reference: 'FAR-005',
        cost: 0.5,
        price: 1,
        stock: 4,
        quantity: 0,
        min_stock: 20,
        category_id: 6,
        category_name: 'Farmacia',
        status: 'active',
        url_img: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
        type_product: 'farmacia',
        attributes: { manufacturer: 'Genven', pharmaceutical_presentation: 'tablets', unit: 'mg', amount: 500, expiration_date: '2027-03-01' } as any,
        created_at: '2025-02-08',
        updated_at: '2025-02-08',
        user_create_id: 1,
        user_update_id: 1,
        email_user_create: 'admin@tiendademo.com',
        email_user_update: 'admin@tiendademo.com'
    },
    {
        id: 6,
        name: 'Juego de Sábanas Queen',
        brand: 'HomeCasa',
        description: 'Juego de sábanas 100% algodón',
        discount: 10,
        reference: 'HOG-006',
        cost: 12,
        price: 22,
        stock: 18,
        quantity: 0,
        min_stock: 5,
        category_id: 7,
        category_name: 'Hogar',
        status: 'inactive',
        url_img: 'https://demo.cozycommerce.dev/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdc6svbdh9%2Fimage%2Fupload%2Fv1745925702%2Fhero-sliders%2Fcalhxdo8l2s8fxgusail.png&w=384&q=75',
        type_product: 'other',
        attributes: {} as any,
        created_at: '2025-02-12',
        updated_at: '2025-02-12',
        user_create_id: 1,
        user_update_id: 1,
        email_user_create: 'admin@tiendademo.com',
        email_user_update: 'admin@tiendademo.com'
    }
];

@Injectable({
    providedIn: 'root'
})
export class ProductJ3mService {
    private products = new BehaviorSubject<Product[]>(MOCK_PRODUCTS);

    constructor(
        private baseCrudService: BaseCrudService,
        private categoriesService: CategoriesService
    ) { }


    /**
     *Devuelve el snapshot actual de productos de forma síncrona, usado por otros
     *servicios (ej. ventas) para calcular totales sin esperar una suscripción.
     *
     * @return {*}  {Product[]}
     * @memberof ProductJ3mService
     */
    getProductsSnapshot(): Product[] {
        return this.products.value;
    }

    getPublicProducts(): Observable<Product[]> {
        return of(this.products.value.filter((p) => p.status === 'active')).pipe(delay(200));
    }
    getProductsById(id: number): Observable<Product> {
        const product = this.products.value.find((p) => p.id === id) as Product;
        return of(product).pipe(delay(200));
    }

    createProduct(product: FormData): Observable<Product> {
        const parsed = JSON.parse(product.get('product') as string) as Product;
        const image = product.get('image');
        const nextId = Math.max(0, ...this.products.value.map((p) => p.id)) + 1;
        const category = this.categoriesService.getCategoriesSnapshot().find((c) => c.id === Number(parsed.category_id));

        const created: Product = {
            ...parsed,
            id: nextId,
            category_name: category?.name || parsed.category_name,
            url_img: image instanceof File ? URL.createObjectURL(image) : parsed.url_img,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            user_create_id: 1,
            user_update_id: 1,
            email_user_create: 'admin@tiendademo.com',
            email_user_update: 'admin@tiendademo.com'
        };

        this.products.next([...this.products.value, created]);
        return of(created).pipe(delay(200));
    }

    updateProduct(product: FormData): Observable<Product> {
        const parsed = JSON.parse(product.get('product') as string) as Product;
        const image = product.get('image');
        const category = this.categoriesService.getCategoriesSnapshot().find((c) => c.id === Number(parsed.category_id));

        const updated: Product = {
            ...parsed,
            category_name: category?.name || parsed.category_name,
            url_img: image instanceof File ? URL.createObjectURL(image) : parsed.url_img,
            updated_at: new Date().toISOString(),
            user_update_id: 1,
            email_user_update: 'admin@tiendademo.com'
        };

        this.products.next(this.products.value.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
        return of(updated).pipe(delay(200));
    }
    getFullProducts(): Observable<Product[]> {
        return of(this.products.value).pipe(delay(200));
    }
    deleteProduct(id: number[]): Observable<ResponseDeleteResource> {
        return this.baseCrudService.eliminateResources(this.products, id);
    }

    updateStatusProduct(data: ProductStatusUpdate): Observable<Product> {
        this.products.next(this.products.value.map((p) => (p.id === data.id ? { ...p, status: data.status } : p)));
        const updated = this.products.value.find((p) => p.id === data.id) as Product;
        return of(updated).pipe(delay(200));
    }

    supplyStock(product: ProductSupply): Observable<Product> {
        this.products.next(this.products.value.map((p) => (p.id === product.id ? { ...p, stock: p.stock + product.quantity } : p)));
        const updated = this.products.value.find((p) => p.id === product.id) as Product;
        return of(updated).pipe(delay(200));
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

        if (typeof attribute.attributes === 'string') attribute.attributes = JSON.parse(attribute.attributes)

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
    getProductsByQuery(filters: ProductQuery): Observable<ProductResponse> {
        let data = this.products.value.filter((p) => p.status === 'active');

        const search = (filters.search || filters.query || '').toString().toLowerCase();
        if (search) {
            data = data.filter((p) => p.name.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search));
        }

        if (filters.category_id) {
            data = data.filter((p) => p.category_id === Number(filters.category_id));
        }

        if (filters.min_price !== undefined && filters.min_price !== null) {
            data = data.filter((p) => p.price >= Number(filters.min_price));
        }

        if (filters.max_price !== undefined && filters.max_price !== null) {
            data = data.filter((p) => p.price <= Number(filters.max_price));
        }

        const limit = Number(filters.limit) || 12;
        const page = Number(filters.page) || 1;
        const total = data.length;
        const totalPages = Math.max(1, Math.ceil(total / limit));
        const start = (page - 1) * limit;

        const response: ProductResponse = {
            data: data.slice(start, start + limit),
            total,
            totalPages,
            currentPage: page,
            itemsPerPage: limit
        };

        return of(response).pipe(delay(200));
    }

    getAllAttributesProduct(): Observable<ProductAttributes<ProductTemplateKeys, ProductKeyGeneralAttributes>[]> {
        return of(ATTRIBUTES_CATALOG).pipe(delay(200));
    }
}
