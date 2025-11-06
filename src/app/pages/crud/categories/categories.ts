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
import { AuthService } from '@/services/auth.service';

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
    private confirmationService: ConfirmationService,
    private authService: AuthService
  ) {}

  get getPermissionsUser() {
    return this.authService.getPermissionsUser();
  }
  ngOnInit() {
    this.categoriesService.getCategoriesTree().subscribe((files) => this.categories.set(files));
    this.getPlaneCategories();
  }

  /**
   *Obtiene el listado de las categorias del select
   *
   * @memberof Categories
   */
  getPlaneCategories() {
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

    // Validamos que la categoria no sea su propia categoria padre
    if (this.category.get('parent_id')?.value === this.category.get('id')?.value)
      return this.messageService.add({
        severity: 'warn',
        summary: 'Error',
        detail: `La categoría ${this.category.get('name')?.value} no puede ser su propia categoría padre`
      });

    let service =
      this.mode_form() === 'create'
        ? this.categoriesService.createCategory.bind(this.categoriesService)
        : this.categoriesService.updateCategory.bind(this.categoriesService);

    service(this.category.value).subscribe((_category_response) => {
      let { node_categories, category, categories } = _category_response;

      //?ESTE MÉTODO SE UTILIZABA PARA ACTUALIZAR DE FORMA LOCAL PERO TIENE UN BUG
      // this.categories.update((current) => this.addOrUpdateCategory(current, node_categories));

      this.categories.set(categories);

      // Actualizamos o editamos el listado de categorias
      this.plane_categories.update(
        this.mode_form() === 'create'
          ? (current) => [...current, category]
          : (current) => current.map((item) => (item.id === category.id ? category : item))
      );

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría creada exitosamente' });
      this.modal.set(false);
    });
  }

  createCategoryService() {}

  /**
   * Itera los nodos hasta saber si agrega o edita el arreglo
   * Tiene un bug al editar el padre
   *
   * @deprecated
   * @param {TreeNode[]} nodes
   * @param {TreeNode} category
   * @return {*}  {TreeNode[]}
   * @memberof Categories
   */
  addOrUpdateCategory(nodes: TreeNode[], category: TreeNode): TreeNode[] {
    // eliminamos el nodo previo del árbol (si existe)
    const cleanedNodes = this.removeCategory(nodes, category.data.id);

    // hora lo insertamos donde corresponde
    if (!category.data.parent_id) {
      // Si no tiene padre, se agrega o reemplaza en el nivel raíz
      const exists = cleanedNodes.some((n) => n.data.id === category.data.id);
      if (exists) {
        return cleanedNodes.map((n) => (n.data.id === category.data.id ? category : n));
      }
      return [...cleanedNodes, category];
    }

    // i tiene padre, lo ubicamos dentro del árbol
    return cleanedNodes.map((node) => {
      if (node.data.id === category.data.parent_id) {
        const children = node.children ?? [];
        const exists = children.some((c) => c.data.id === category.data.id);

        const updatedChildren = exists
          ? children.map((c) => (c.data.id === category.data.id ? category : c))
          : [...children, category];

        return { ...node, children: updatedChildren };
      }

      if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: this.addOrUpdateCategory(node.children, category)
        };
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

  deleteCategory(node_tree: any) {
    let category = node_tree.node.data;
    let children = node_tree.node.children;
    let sms = `Estas seguro de eliminar la categoría ${category.name}?`;

    //separamos los labels del los hijos
    let label_children = children.map((item: any) => item.label).join(' -> ');

    if (children.length > 0) sms += `\nTambién se eliminaran las sub categorías, ${label_children}`;
    this.confirmationService.confirm({
      message: sms.replace(/\n/g, '<br/>'),
      header: 'Eliminar categoría',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteCategoryService(category, children);
      }
    });
  }

  /**
   * LLama al servicio de eliminar para borrar una categoría
   *
   * @memberof Categories
   * @param {Category} category
   */
  deleteCategoryService(category: Category, children: TreeNode[]) {
    this.categoriesService.deleteCategory(category.id).subscribe((_category_response) => {
      let { node_categories, category } = _category_response;

      // Actualizamos o editamos el listado de categorias
      this.categories.update((current) => this.removeCategory(current, category.id));

      // obtenemos los ids de las categorias hijas elmiinadas y contacenamos el id de la categoria a eliminar
      let categories_eliminates = children.map((item: any) => item.id).concat([category.id]);

      this.plane_categories.update((current) => current.filter((item) => !categories_eliminates.includes(item.id)));
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Categoría eliminada exitosamente' });
    });
  }

  openModal() {
    this.category.patchValue({
      id: 0,
      name: '',
      parent_id: null
    });
    this.modal.set(true);
    this.mode_form.set('create');
  }

  editCategory(data: Category) {
    this.openModal();
    this.category.patchValue(data);
    this.mode_form.set('edit');
  }
}
