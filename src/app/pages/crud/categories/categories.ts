import { LayoutService } from '@/layout/service/layout.service';
import { AppMenuBar } from '@/pages/components/app-menu-bar/app-menu-bar';
import { NodeService } from '@/pages/service/node.service';
import { CategoriesService } from '@/services/categories.service';
import { CommonModule } from '@angular/common';
import { Component, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { ConfirmationService, MessageService, TreeNode } from 'primeng/api';
import { Button } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TreeTableModule } from 'primeng/treetable';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { TextareaModule } from 'primeng/textarea';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category, CategoryForm } from '@/interfaces/category';
import { Message } from 'primeng/message';
import { Select } from 'primeng/select';

@Component({
  selector: 'app-categories',
  imports: [
    AppMenuBar,
    TreeTableModule,
    TooltipModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    Button,
    CommonModule,
    InputTextModule,
    TextareaModule,
    FormsModule,
    IconField,
    InputIcon,
    Message,
    Select
  ],
  templateUrl: './categories.html',
  styleUrl: './categories.scss'
})
export class Categories {
  @ViewChild('tt') tt: any;

  categories: WritableSignal<TreeNode[]> = signal([]);

  plane_categories: WritableSignal<Category[]> = signal([]);

  modal: WritableSignal<boolean> = signal(false);
  cols: any[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'created_at', header: 'Fecha' },
    { field: '', header: 'acciones' }
  ];

  category: FormGroup<CategoryForm> = new FormGroup<CategoryForm>({
    id: new FormControl(0),
    name: new FormControl('', [Validators.required]),
    parent_id: new FormControl(null)
  });

  constructor(
    public layoutService: LayoutService,
    private categoriesService: CategoriesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.categoriesService.getCategoriesTree().subscribe((files) => this.categories.set(files));
    this.categoriesService.getCategories().subscribe((files) => this.plane_categories.set(files));
  }

  /**
   *Filtro global de la tabla
   *
   * @param {*} $event
   * @param {*} tt
   * @memberof Categories
   */
  filterGlobal($event: any, tt: any) {
    tt.filterGlobal($event.target.value, 'contains');
  }

  guardar(): void {
    this.category.markAllAsDirty();
    this.category.updateValueAndValidity();

    //si el formulario no es valido salimos del proceso
    if (!this.category.valid) return;

    this.categoriesService.createCategory(this.category.value).subscribe((category) => {


      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría creada exitosamente' });
      this.modal.set(false);
    });
  }
}
