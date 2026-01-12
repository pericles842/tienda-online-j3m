import { ComponentTemplateAttributesProduct } from '@/interfaces/forms';
import { FormGroupTemplateAttributes, ProductAttributes, SubAttributesForTechnology } from '@/interfaces/product';
import { ProductJ3mService } from '@/services/products.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'primeng/colorpicker';
import { InputTextModule } from 'primeng/inputtext';
import { Message } from "primeng/message";

@Component({
  selector: 'app-product-attributes-technology',
  imports: [CommonModule, ReactiveFormsModule, ColorPickerModule, InputTextModule, Message],
  templateUrl: './product-attributes-technology.html',
  styleUrl: './product-attributes-technology.scss'
})
export class ProductAttributesTechnology implements ComponentTemplateAttributesProduct {
  @Input() formGroup!: FormGroup<FormGroupTemplateAttributes>;
  @Input() attributes!: ProductAttributes<'technology', SubAttributesForTechnology>;

  constructor(private productJ3mService: ProductJ3mService) {}

  getDataAttributeProduct(attribute: ProductAttributes, key: SubAttributesForTechnology) {
    return this.productJ3mService.getDataAttributeProduct(attribute, key);
  }
}
