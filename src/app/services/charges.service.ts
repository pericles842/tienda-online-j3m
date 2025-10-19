import { CreateCharge, SimpleCharge } from '@/interfaces/charges';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargesService {
  constructor(private http: HttpClient) {}

  /**
   *Lista los roles en conjunto a la permisologia y los modulos
   *
   * @return {*}  {Observable<CreateCharge[]>}
   * @memberof ChargesService
   */
  getRoles(): Observable<CreateCharge[]> {
    return this.http.get<CreateCharge[]>(`${environment.host}/role-permissions`);
  }

  createRole(role: CreateCharge): Observable<CreateCharge> {
    return this.http.post<CreateCharge>(`${environment.host}/create-role`, role);
  }

  deleteRoles(id: number): Observable<{}> {
    return this.http.delete<{}>(`${environment.host}/role-permissions/${id}`);
  }

  /**
   *Lista roles roles simples sin modulos sin permisos
   *
   * @return {*}  {Observable<SimpleCharge[]>}
   * @memberof ChargesService
   */
  getSimpleRoles(): Observable<SimpleCharge[]> {
    return this.http.get<SimpleCharge[]>(`${environment.host}/roles`);
  }

  /**
   *Elimina grups de roles
   *
   * @param {number[]} id
   * @return {*}  {Observable<{ ids_array: number[] }>}
   * @memberof ChargesService
   */
  deleteGroupRoles(id: number[]): Observable<{ ids_to_delete_from_request: number[] }> {
    return this.http.delete<{ ids_to_delete_from_request: number[] }>(`${environment.host}/role-group-permissions`, {
      params: { id }
    });
  }
}
