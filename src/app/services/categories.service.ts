import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { Category } from '@/interfaces/category';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategoriesTree(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${environment.host}/categories-tree`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.host}/categories`);
  }

  createCategory(category: Category): Observable<{ category: Category; node_categories: TreeNode }> {
    return this.http.post<{ category: Category; node_categories: TreeNode }>(`${environment.host}/create-category`, category);
  }

  updateCategory(category: Category): Observable<{ category: Category; node_categories: TreeNode }> {
    return this.http.put<{ category: Category; node_categories: TreeNode }>(`${environment.host}/update-category`, category);
  }
}
