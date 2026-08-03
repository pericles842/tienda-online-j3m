import { ResponseDeleteResource } from '@/interfaces/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseCrudService {
  /**
   *Se encarga de eliminar uno o varios recursos del store en memoria indicado
   *
   * @param {BehaviorSubject<{ id: number }[]>} store BehaviorSubject donde vive la colección en memoria
   * @param {number[]} id ids a eliminar
   * @return {*}  {Observable<ResponseDeleteResource>}
   *
   * @example this.baseCrudService.eliminateResources(this.products, [1,2,3])
   * @memberof BaseCrudService
   */
  eliminateResources<T extends { id: number }>(store: BehaviorSubject<T[]>, id: number[]): Observable<ResponseDeleteResource> {
    store.next(store.value.filter((item) => !id.includes(item.id)));
    return of({ ids: id }).pipe(delay(200));
  }
}
