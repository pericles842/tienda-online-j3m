import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';
import { Category, CategoryTreeResponse } from '@/interfaces/category';

@Injectable({ providedIn: 'root' })
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategoriesTree(): Observable<TreeNode[]> {
    return this.http.get<TreeNode[]>(`${environment.host}/categories-tree`);
  }

  getPublicCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.host}/categories-public`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.host}/categories`);
  }

  createCategory(category: Category): Observable<CategoryTreeResponse> {
    return this.http.post<CategoryTreeResponse>(`${environment.host}/create-category`, category);
  }

  updateCategory(category: Category): Observable<CategoryTreeResponse> {
    return this.http.put<CategoryTreeResponse>(`${environment.host}/update-category`, category);
  }

  deleteCategory(id_category: number): Observable<CategoryTreeResponse> {
    return this.http.delete<CategoryTreeResponse>(`${environment.host}/delete-category/${id_category}`);
  }
}
