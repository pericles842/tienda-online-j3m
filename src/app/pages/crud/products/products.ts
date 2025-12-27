import { Component, signal, WritableSignal } from '@angular/core';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { Dialog } from 'primeng/dialog';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';
import { FormGroup } from '@angular/forms';
import { ProductFormGroup } from '@/interfaces/product';

@Component({
  selector: 'app-products',
  imports: [AppMenuBar, Dialog, DynamicUpload],
  templateUrl: './products.html',
  styleUrl: './products.scss'
})
export class Products {
  modal: WritableSignal<boolean> = signal(false);

  productForm: FormGroup<ProductFormGroup> = new FormGroup({
    
  });

  openModal() {
    this.modal.set(true);
  }
}
