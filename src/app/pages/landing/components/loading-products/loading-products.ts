import { Component } from '@angular/core';
import { Skeleton } from "primeng/skeleton";

@Component({
  selector: 'app-loading-products',
  imports: [Skeleton],
  templateUrl: './loading-products.html',
  styleUrl: './loading-products.scss'
})
export class LoadingProducts {

}
