import { ComponentTemplateAttributesProduct } from '@/interfaces/forms';
import { FormGroupTemplateAttributes, ProductAttributes, ProductKeyGeneralAttributes } from '@/interfaces/product';
import { ProductJ3mService } from '@/services/products.service';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-product-attributes-farmacia',
  imports: [Message, ReactiveFormsModule, InputTextModule, Select],
  templateUrl: './product-attributes-farmacia.html',
  styleUrl: './product-attributes-farmacia.scss'
})
export class ProductAttributesFarmacia implements ComponentTemplateAttributesProduct {
  @Input() formGroup!: FormGroup<FormGroupTemplateAttributes>;
  @Input() attributes!: ProductAttributes<'farmacia', ProductKeyGeneralAttributes>;

  constructor(private productJ3mService: ProductJ3mService) {}

  getDataAttributeProduct(attribute: ProductAttributes, key: ProductKeyGeneralAttributes) {
    return this.productJ3mService.getDataAttributeProduct(attribute, key);
  }
}
