import { ComponentTemplateAttributesProduct } from '@/interfaces/forms';
import { FormGroupTemplateAttributes, ProductAttributes, SubAttributesForTextile } from '@/interfaces/product';
import { ProductJ3mService } from '@/services/products.service';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-attributes-other',
  imports: [],
  templateUrl: './product-attributes-other.html',
  styleUrl: './product-attributes-other.scss'
})
export class ProductAttributesOther implements ComponentTemplateAttributesProduct {
  @Input() formGroup!: FormGroup<FormGroupTemplateAttributes>;
  @Input() attributes!: ProductAttributes<'other', any>;

  constructor(private productJ3mService: ProductJ3mService) {}

  getDataAttributeProduct(attribute: ProductAttributes, key: any) {
    return this.productJ3mService.getDataAttributeProduct(attribute, key);
  }
}
