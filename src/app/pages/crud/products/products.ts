import { Category } from '@/interfaces/category';
import {
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
    NgComponentOutlet,
    FormsModule,
    Message,
    Button,
    TagModule,
    Select
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  modal: WritableSignal<boolean> = signal(true);

  categories: WritableSignal<Category[]> = signal([]);
  attributes_products: WritableSignal<ProductAttributes<ProductTemplateKeys, ProductKeyGeneralAttributes>[]> = signal([]);

  productForm: FormGroup<ProductFormGroup> = new FormGroup(
    {
      id: new FormControl(0),
      name: new FormControl('', [Validators.required]),
      url_img: new FormControl(null),
      image: new FormControl(null),
      category_id: new FormControl(null, [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      discount: new FormControl(0),
      reference: new FormControl('', [Validators.required]),
      cost: new FormControl(0, [Validators.required]),
      price: new FormControl(0, [Validators.required]),
      stock: new FormControl(0),
      min_stock: new FormControl(0, [Validators.required]),
      status: new FormControl('inactive', [Validators.required]),
      type_product: new FormControl('food', [Validators.required]),
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
  }

  setFormGroupToAttributes(value: ProductTemplateKeys) {
    this.productForm.setControl('attributes', this.productService.generateTemplatesFormGroup(value));
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
}
