import { CreateCharge, SimpleCharge } from '@/interfaces/charges';
import { ChargesResponse } from '@/interfaces/user';
import { Modules } from '@/interfaces/modules';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

/**
 * Modulos que forman parte del flujo comercial, usados para armar
 * permisos de nivel intermedio (rol Vendedor) en la data mock.
 */
const SALES_MODULE_IDS = [4, 5, 6, 8, 9, 10];

export function buildPermissions(role_id: number, rol: string, level: 'full' | 'sales' | 'readonly' = 'readonly'): ChargesResponse[] {
  return Object.values(Modules).map((module, index) => {
    const full = level === 'full';
    const sales = level === 'sales' && SALES_MODULE_IDS.includes(module.id);

    return {
      id: index + 1,
      id_user: 0,
      role_id,
      rol,
      module_id: module.id,
      module: module.name,
      can_view: full || sales,
      can_create: full || sales,
      can_update: full || sales,
      can_delete: full
    };
  });
}

const MOCK_ROLES: CreateCharge[] = [
  {
    id: 1,
    name: 'Administrador',
    description: 'Acceso total al sistema',
    permissions: buildPermissions(1, 'Administrador', 'full')
  },
  {
    id: 2,
    name: 'Vendedor',
    description: 'Gestiona productos, categorías, inventario y ventas',
    permissions: buildPermissions(2, 'Vendedor', 'sales')
  },
  {
    id: 3,
    name: 'Cliente',
    description: 'Usuario cliente de la tienda pública',
    permissions: buildPermissions(6, 'Cliente', 'readonly')
  }
];

@Injectable({
  providedIn: 'root'
})
export class ChargesService {
  private roles = new BehaviorSubject<CreateCharge[]>(MOCK_ROLES);

  /**
   *Lista los roles en conjunto a la permisologia y los modulos
   *
   * @return {*}  {Observable<CreateCharge[]>}
   * @memberof ChargesService
   */
  getRoles(): Observable<CreateCharge[]> {
    return of(this.roles.value).pipe(delay(200));
  }

  createRole(role: CreateCharge): Observable<CreateCharge> {
    const nextId = Math.max(0, ...this.roles.value.map((r) => r.id)) + 1;
    const created: CreateCharge = { ...role, id: nextId };
    this.roles.next([...this.roles.value, created]);
    return of(created).pipe(delay(200));
  }

  deleteRoles(id: number): Observable<{}> {
    this.roles.next(this.roles.value.filter((role) => role.id !== id));
    return of({}).pipe(delay(200));
  }

  /**
   *Lista roles roles simples sin modulos sin permisos
   *
   * @return {*}  {Observable<SimpleCharge[]>}
   * @memberof ChargesService
   */
  getSimpleRoles(): Observable<SimpleCharge[]> {
    const simpleRoles: SimpleCharge[] = this.roles.value.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
      created_at: new Date().toISOString()
    }));
    return of(simpleRoles).pipe(delay(200));
  }

  /**
   *Elimina grups de roles
   *
   * @param {number[]} id
   * @return {*}  {Observable<{ ids_array: number[] }>}
   * @memberof ChargesService
   */
  deleteGroupRoles(id: number[]): Observable<{ ids_to_delete_from_request: number[] }> {
    this.roles.next(this.roles.value.filter((role) => !id.includes(role.id)));
    return of({ ids_to_delete_from_request: id }).pipe(delay(200));
  }
}
