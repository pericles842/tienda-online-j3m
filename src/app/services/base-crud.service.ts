import { ResponseDeleteResource } from '@/interfaces/forms';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService {
  constructor(private http: HttpClient) {}

  /**
   *Se encarga de eliminar un recurso o varios recursos
   *
   * @param {string} url 'users/one-client/1'
   * @param {number} id 1
   * @return {*}  {Observable<ResponseDeleteResource>}
   *
   * @example this.eliminateResources('users/one-client', [1,2,3])
   * @memberof BaseCrudService
   */
  eliminateResources(url: string, id: number[]): Observable<ResponseDeleteResource> {
    return this.http.delete<ResponseDeleteResource>(`${environment.host}/${url}`, { params: { id } });
  }
}
