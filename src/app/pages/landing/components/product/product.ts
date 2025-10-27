import { Component, Input } from '@angular/core';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product',
  imports: [TagModule,ButtonModule],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class Product {
  @Input() product:any ;
}
