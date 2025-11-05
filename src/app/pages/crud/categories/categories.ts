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
  mode_form: WritableSignal<'edit' | 'create'> = signal('create');

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

    let service =
      this.mode_form() === 'create'
        ? this.categoriesService.createCategory.bind(this.categoriesService)
        : this.categoriesService.updateCategory.bind(this.categoriesService);

    service(this.category.value).subscribe((_category_response) => {
      let {node_categories, category} = _category_response;

      this.categories.update((current) => this.addOrUpdateCategory(current, node_categories));

      this.plane_categories.update((current)=> [...current, category]);
      console.log(category);
      console.log(this.category.value);
      

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría creada exitosamente' });
      this.modal.set(false);
    });
  }

  createCategoryService() {}

  /**
   *Itera los nodos hasta saber si agrega o edita el arreglo
   *
   * @param {TreeNode[]} nodes
   * @param {TreeNode} category
   * @return {*}  {TreeNode[]}
   * @memberof Categories
   */
  addOrUpdateCategory(nodes: TreeNode[], category: TreeNode): TreeNode[] {
    if (!category.data.parent_id) {
      // Si no tiene padre, revisamos si ya existe en el nivel raíz
      const exists = nodes.some((n) => n.data.id === category.data.id);
      if (exists) {
        // Si ya existe, lo reemplazamos
        return nodes.map((n) => (n.data.id === category.data.id ? category : n));
      }
      // Si no existe, lo agregamos
      return [...nodes, category];
    }

    // Si tiene padre, recorremos los nodos para encontrarlo
    return nodes.map((node) => {
      if (node.data.id === category.data.parent_id) {
        // Es el padre → ahora revisamos si el hijo ya existe
        const children = node.children ?? [];
        const exists = children.some((c) => c.data.id === category.data.id);

        const updatedChildren = exists
          ? children.map((c) => (c.data.id === category.data.id ? category : c)) // actualizar
          : [...children, category]; // agregar

        return { ...node, children: updatedChildren };
      }

      // Si no es el padre, buscamos dentro de sus hijos
      if (node.children && node.children.length > 0) {
        return { ...node, children: this.addOrUpdateCategory(node.children, category) };
      }

      return node;
    });
  }

  removeCategory(nodes: TreeNode[], categoryId: number): TreeNode[] {
    // Recorremos todos los nodos del nivel actual
    return (
      nodes
        // Primero filtramos los nodos que no coincidan con el ID a eliminar
        .filter((node) => node.data.id !== categoryId)
        //  Luego procesamos los hijos de forma recursiva
        .map((node) => {
          if (node.children && node.children.length > 0) {
            return { ...node, children: this.removeCategory(node.children, categoryId) };
          }
          return node;
        })
    );
  }

  openModal() {
    this.category.reset();
    this.modal.set(true);
    this.mode_form.set('create');
  }

  editCharge(data: Category) {
    this.openModal();
    this.category.patchValue(data);
    this.mode_form.set('edit');
  }
}
