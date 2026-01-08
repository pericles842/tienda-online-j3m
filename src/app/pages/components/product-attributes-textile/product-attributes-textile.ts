import { ComponentTemplateAttributesProduct } from '@/interfaces/forms';
import {
  FormGroupTemplateAttributes,
  ProductAttributes,
  ProductKeyGeneralAttributes,
  SubAttributesForTextile
} from '@/interfaces/product';
import { ProductJ3mService } from '@/services/products.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-product-attributes-textile',
  imports: [CommonModule, ReactiveFormsModule, Select, InputTextModule, TextareaModule, FormsModule, ColorPickerModule],
  templateUrl: './product-attributes-textile.html',
  styleUrl: './product-attributes-textile.scss'
})
export class ProductAttributesTextile implements ComponentTemplateAttributesProduct {
  @Input() formGroup!: FormGroup<FormGroupTemplateAttributes>;
  @Input() attributes!: ProductAttributes<'textile', SubAttributesForTextile>;

  constructor(private productJ3mService: ProductJ3mService) {}

  getDataAttributeProduct(attribute: ProductAttributes, key: SubAttributesForTextile) {
    return this.productJ3mService.getDataAttributeProduct(attribute, key);
  }
}
