import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { Category, CategoryTreeResponse } from '@/interfaces/category';

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Alimentos', parent_id: 0, created_at: '2025-01-05' },
  { id: 2, name: 'Bebidas', parent_id: 1, created_at: '2025-01-06' },
  { id: 3, name: 'Electrónica', parent_id: 0, created_at: '2025-01-07' },
  { id: 4, name: 'Celulares', parent_id: 3, created_at: '2025-01-08' },
  { id: 5, name: 'Ropa', parent_id: 0, created_at: '2025-01-09' },
  { id: 6, name: 'Farmacia', parent_id: 0, created_at: '2025-01-10' },
  { id: 7, name: 'Hogar', parent_id: 0, created_at: '2025-01-11' }
];

function buildCategoriesTree(categories: Category[]): TreeNode[] {
  const nodes = new Map<number, TreeNode>();

  categories.forEach((category) => {
    nodes.set(category.id, { key: String(category.id), label: category.name, data: category, children: [] });
  });

  const roots: TreeNode[] = [];

  categories.forEach((category) => {
    const node = nodes.get(category.id)!;
    const parent = category.parent_id ? nodes.get(category.parent_id) : undefined;

    if (parent) {
      parent.children!.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots;
}

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  private categories = new BehaviorSubject<Category[]>(MOCK_CATEGORIES);

  /**
   *Devuelve el snapshot actual de categorías de forma síncrona, usado por otros
   *servicios (ej. productos) para resolver el nombre de la categoría sin esperar
   *una nueva suscripción.
   *
   * @return {*}  {Category[]}
   * @memberof CategoriesService
   */
  getCategoriesSnapshot(): Category[] {
    return this.categories.value;
  }

  getCategoriesTree(): Observable<TreeNode[]> {
    return of(buildCategoriesTree(this.categories.value)).pipe(delay(200));
  }

  getPublicCategories(): Observable<Category[]> {
    return of(this.categories.value).pipe(delay(200));
  }

  getCategories(): Observable<Category[]> {
    return of(this.categories.value).pipe(delay(200));
  }

  createCategory(category: Category): Observable<CategoryTreeResponse> {
    const nextId = Math.max(0, ...this.categories.value.map((c) => c.id)) + 1;
    const created: Category = { ...category, id: nextId, created_at: new Date().toISOString() };

    this.categories.next([...this.categories.value, created]);

    return of({
      category: created,
      node_categories: { key: String(created.id), label: created.name, data: created },
      categories: buildCategoriesTree(this.categories.value)
    }).pipe(delay(200));
  }

  updateCategory(category: Category): Observable<CategoryTreeResponse> {
    this.categories.next(this.categories.value.map((c) => (c.id === category.id ? { ...c, ...category } : c)));

    return of({
      category,
      node_categories: { key: String(category.id), label: category.name, data: category },
      categories: buildCategoriesTree(this.categories.value)
    }).pipe(delay(200));
  }

  deleteCategory(id_category: number): Observable<CategoryTreeResponse> {
    const deleted = this.categories.value.find((c) => c.id === id_category);

    this.categories.next(this.categories.value.filter((c) => c.id !== id_category && c.parent_id !== id_category));

    return of({
      category: deleted as Category,
      node_categories: {} as TreeNode,
      categories: buildCategoriesTree(this.categories.value)
    }).pipe(delay(200));
  }
}
