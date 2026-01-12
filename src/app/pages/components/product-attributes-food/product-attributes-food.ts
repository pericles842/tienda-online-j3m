import { ComponentTemplateAttributesProduct } from '@/interfaces/forms';
import {
  ProductAttributes,
  ProductTemplateKeys,
  ProductKeyGeneralAttributes,
  FormGroupTemplateAttributes,
  SubAttributesForFood
} from '@/interfaces/product';
import { ProductJ3mService } from '@/services/products.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-product-attributes-food',
  imports: [Message, ReactiveFormsModule, CommonModule, InputTextModule, Select, InputNumberModule, DatePickerModule],
  templateUrl: './product-attributes-food.html',
  styleUrl: './product-attributes-food.scss'
})
export class ProductAttributesFood implements ComponentTemplateAttributesProduct {
  @Input() attributes!: ProductAttributes<'food', SubAttributesForFood>;
  @Input() formGroup!: FormGroup<FormGroupTemplateAttributes>;

  constructor(private productJ3mService: ProductJ3mService) {}

  getDataAttributeProduct(attribute: ProductAttributes, key: SubAttributesForFood) {
    return this.productJ3mService.getDataAttributeProduct(attribute, key);
  }
}
