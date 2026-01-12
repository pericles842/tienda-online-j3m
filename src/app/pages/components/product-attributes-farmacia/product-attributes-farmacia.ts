import { ComponentTemplateAttributesProduct } from '@/interfaces/forms';
import {
  FormGroupTemplateAttributes,
  ProductAttributes,
  ProductKeyGeneralAttributes,
  SubAttributesForFarmacia
} from '@/interfaces/product';
import { ProductJ3mService } from '@/services/products.service';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DatePickerModule } from 'primeng/datepicker';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-attributes-farmacia',
  imports: [
    Message,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule,
    InputTextModule,
    Select,
    InputNumberModule,
    DatePickerModule
  ],
  templateUrl: './product-attributes-farmacia.html',
  styleUrl: './product-attributes-farmacia.scss'
})
export class ProductAttributesFarmacia implements ComponentTemplateAttributesProduct {
  @Input() formGroup!: FormGroup<FormGroupTemplateAttributes>;
  @Input() attributes!: ProductAttributes<'farmacia', SubAttributesForFarmacia>;

  constructor(private productJ3mService: ProductJ3mService) {}

  getDataAttributeProduct(attribute: ProductAttributes, key: SubAttributesForFarmacia) {
    return this.productJ3mService.getDataAttributeProduct(attribute, key);
  }
}
