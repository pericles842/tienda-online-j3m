import { Category } from '@/interfaces/category';
import {
  Product,
  ProductAttributes,
  ProductFormGroup,
  ProductKeyGeneralAttributes,
  ProductTemplateKeys,
  TemplateAttributesProduct
} from '@/interfaces/product';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';
import { ProductAttributesFarmacia } from '@/pages/components/product-attributes-farmacia/product-attributes-farmacia';
import { ProductAttributesFood } from '@/pages/components/product-attributes-food/product-attributes-food';
import { ProductAttributesOther } from '@/pages/components/product-attributes-other/product-attributes-other';
import { ProductAttributesTechnology } from '@/pages/components/product-attributes-technology/product-attributes-technology';
import { ProductAttributesTextile } from '@/pages/components/product-attributes-textile/product-attributes-textile';
import { AuthService } from '@/services/auth.service';
import { CategoriesService } from '@/services/categories.service';
import { ProductJ3mService } from '@/services/products.service';
import { fileOrUrlValidator } from '@/utils/forms';
import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Button } from 'primeng/button';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { TreeTableModule } from 'primeng/treetable';
import { InputNumberModule } from 'primeng/inputnumber';
import { StyleClass } from 'primeng/styleclass';
import { Column } from '@/interfaces/forms';
import { DynamicTable } from "@/pages/components/dynamic-table/dynamic-table";

@Component({
  selector: 'app-products',
  imports: [
    AppMenuBar,
    Dialog,
    DynamicUpload,
    CommonModule,
    InputTextModule,
    TextareaModule,
    TreeTableModule,
    Dialog,
    ReactiveFormsModule,
    InputNumberModule,
    NgComponentOutlet,
    FormsModule,
    Message,
    Button,
    TagModule,
    Select,
    DynamicTable
],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  modal: WritableSignal<boolean> = signal(false);
  columns: Column[] = [
    { label: 'Nombre', key: 'name', sortTable: true },
    { label: 'url_img', key: 'url_img', sortTable: false, dataType: 'image' },
    { label: 'Categoría', key: 'category_name', sortTable: true },
    { label: 'Marca', key: 'brand', sortTable: true },
    { label: 'Referencia', key: 'reference', sortTable: true },
    { label: 'Precio', key: 'price', sortTable: true },
    { label: 'Descuento', key: 'discount', sortTable: true },
    { label: 'Stock', key: 'stock', sortTable: true },
    { label: 'Estatus', key: 'status', sortTable: true },
    { label: 'Fecha de creación', dataType: 'date', key: 'created_at', sortTable: true },
    { label: 'Creador email', key: 'email_user_create', sortTable: true },
    { label: 'fecha de actualización', dataType: 'date', key: 'updated_at', sortTable: true },
    { label: 'Editor email', key: 'email_user_update', sortTable: true }
  ];
  globalFilterFields: string[] = ['name', 'category_name', 'reference', 'stock', 'brand', 'status'];

  categories: WritableSignal<Category[]> = signal([]);
  attributes_products: WritableSignal<ProductAttributes<ProductTemplateKeys, ProductKeyGeneralAttributes>[]> = signal([]);
  products: WritableSignal<Product[]> = signal([]);

  productForm: FormGroup<ProductFormGroup> = new FormGroup(
    {
      id: new FormControl(0),
      name: new FormControl(null, [Validators.required]),
      url_img: new FormControl(null),
      image: new FormControl(null),
      category_id: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      discount: new FormControl(null),
      reference: new FormControl(null, [Validators.required]),
      cost: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      stock: new FormControl(null),
      min_stock: new FormControl(null),
      status: new FormControl('inactive', [Validators.required]),
      type_product: new FormControl('technology', [Validators.required]),
      attributes: new FormGroup({})
    },
    { validators: fileOrUrlValidator() }
  );

  template_attributes_product: TemplateAttributesProduct[] = [];
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService,
    private productService: ProductJ3mService
  ) {}
  ngOnInit() {
    this.productService.getFullProducts().subscribe((data) => this.products.set(data));
    this.categoriesService.getPublicCategories().subscribe((data) => this.categories.set(data));
    this.productService.getAllAttributesProduct().subscribe((data) => {
      this.attributes_products.set(data);
      this.setTemplateAttributesProduct();
    });

    this.productForm.get('type_product')?.valueChanges.subscribe((value) => this.setFormGroupToAttributes(value));
    this.setFormGroupToAttributes(this.productForm.get('type_product')?.value);
  }
  openModal() {
    this.modal.set(true);
    this.productForm.patchValue({
      id: 0,
      name: null,
      url_img: null,
      image: null,
      category_id: null,
      brand: null,
      description: null,
      discount: null,
      reference: null,
      cost: null,
      price: null,
      stock: null,
      min_stock: null,
      status: 'inactive',
      type_product: 'technology'
    });
  }

  setFormGroupToAttributes(value: ProductTemplateKeys) {
    const form_group_attributes = this.productForm.get('attributes') as FormGroup;

    // Limpia controles anteriores
    Object.keys(form_group_attributes.controls).forEach((key) => {
      form_group_attributes.removeControl(key);
    });

    // Agrega los nuevos
    const new_form_group_attributes = this.productService.generateTemplatesFormGroup(value);

    Object.keys(new_form_group_attributes.controls).forEach((key) => {
      form_group_attributes.addControl(key, new_form_group_attributes.get(key)!);
    });
  }

  setTemplateAttributesProduct() {
    let attributes_products!: {
      [key in ProductTemplateKeys]: ProductAttributes;
    };
    this.attributes_products().forEach((item) => {
      item.attributes = JSON.parse(item.attributes.toString());
      attributes_products = { ...attributes_products, [item.key]: item };
    });
    console.log(attributes_products);
    this.template_attributes_product = [
      {
        key: 'food',
        label: 'Alimentos',
        component: ProductAttributesFood,
        inputs: {
          attributes: attributes_products.food,
          formGroup: this.productForm.get('attributes')
        }
      },
      {
        key: 'other',
        label: 'Otro',
        component: ProductAttributesOther,
        inputs: {
          attributes: attributes_products.other,
          formGroup: this.productForm.get('attributes')
        }
      },
      {
        key: 'farmacia',
        label: 'Farmacia',
        component: ProductAttributesFarmacia,
        inputs: {
          attributes: attributes_products.farmacia,
          formGroup: this.productForm.get('attributes')
        }
      },
      {
        key: 'technology',
        label: 'Tecnología',
        component: ProductAttributesTechnology,
        inputs: {
          attributes: attributes_products.technology,
          formGroup: this.productForm.get('attributes')
        }
      },
      {
        key: 'textile',
        label: 'Textil',
        component: ProductAttributesTextile,
        inputs: {
          attributes: attributes_products.textile,
          formGroup: this.productForm.get('attributes')
        }
      }
    ];
  }
  fileSelected(file: File) {
    this.productForm.patchValue({ image: file });
  }
  severityValueStatus() {
    if (this.productForm.get('status')?.value == 'active') {
      return 'success';
    } else if (this.productForm.get('status')?.value == 'inactive') {
      return 'danger';
    } else {
      return 'warning';
    }
  }

  stockValueStatus() {
    const stock = this.productForm.get('stock')?.value;
    const minStock = this.productForm.get('min_stock')?.value;

    if (stock > minStock) {
      return 'success';
    } else if (stock < minStock) {
      return 'warning';
    } else {
      return 'danger';
    }
  }

  severityStatusLabel() {
    switch (this.productForm.get('status')?.value) {
      case 'active':
        return 'Activo';
      case 'inactive':
        return 'Inactivo';
      case 'damaged':
        return 'Dañado';
      default:
        return 'Desconocido';
    }
  }

  createProductService(formData: FormData) {
    this.productService.createProduct(formData).subscribe((data) => {
      this.products.update((current) => [...current, data]);
      this.modal.set(false);
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Producto creado exitosamente' });
    });
  }

  saveProduct() {
    this.productForm.markAllAsDirty();
    this.productForm.updateValueAndValidity();

    //si el formulario no es valido salimos del proceso
    if (!this.productForm.valid) return;

    const formData = new FormData();
    formData.append('product', JSON.stringify(this.productForm.value));
    formData.append('image', this.productForm.value.image);

    this.createProductService(formData);
  }
}
