import { Category } from '@/interfaces/category';
import { ProductFormGroup } from '@/interfaces/product';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { DynamicUpload } from '@/pages/components/dynamic-upload/dynamic-upload';
import { CategoriesService } from '@/services/categories.service';
import { fileOrUrlValidator } from '@/utils/forms';
import { CommonModule } from '@angular/common';
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
      status: new FormControl('active', [Validators.required]),
      attributes: new FormGroup({})
    },
    { validators: fileOrUrlValidator() }
  );
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private categoriesService: CategoriesService
  ) {}
  ngOnInit() {
    this.categoriesService.getPublicCategories().subscribe((data) => this.categories.set(data));
  }
  openModal() {
    this.modal.set(true);
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
}
