import { PublicGroup } from '@/interfaces/groups';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { BaseCrudService } from './base-crud.service';
import { ResponseDeleteResource } from '@/interfaces/forms';

const MOCK_PUBLIC_GROUPS: PublicGroup[] = [
  {
    id: 1,
    name: 'Caja de ahorro Los Robles',
    description: 'Grupo de ahorro comunitario del sector Los Robles',
    rif: 'J-12345678-9',
    email: 'losrobles@tiendademo.com',
    url_img: 'assets/images/logotipo.PNG',
    created_at: '2025-01-15'
  },
  {
    id: 2,
    name: 'Caja de ahorro El Paraíso',
    description: 'Grupo de ahorro comunitario del sector El Paraíso',
    rif: 'J-98765432-1',
    email: 'elparaiso@tiendademo.com',
    url_img: 'assets/images/logotipo.PNG',
    created_at: '2025-02-20'
  }
];

function parseGroupFormData(group: FormData): PublicGroup {
  const parsed = JSON.parse(group.get('group') as string) as PublicGroup;
  const image = group.get('image');

  return {
    ...parsed,
    url_img: image instanceof File ? URL.createObjectURL(image) : parsed.url_img
  };
}

@Injectable({
  providedIn: 'root'
})
export class PublicGroupsService {
  private groups = new BehaviorSubject<PublicGroup[]>(MOCK_PUBLIC_GROUPS);

  constructor(private baseCrudService: BaseCrudService) {}

  getPublicGroups(): Observable<PublicGroup[]> {
    return of(this.groups.value).pipe(delay(200));
  }

  createPublicGroup(group: FormData): Observable<PublicGroup> {
    const parsed = parseGroupFormData(group);
    const nextId = Math.max(0, ...this.groups.value.map((g) => g.id)) + 1;
    const created: PublicGroup = { ...parsed, id: nextId, created_at: new Date().toISOString() };

    this.groups.next([...this.groups.value, created]);
    return of(created).pipe(delay(200));
  }

  updatePublicGroup(group: FormData): Observable<PublicGroup> {
    const parsed = parseGroupFormData(group);
    this.groups.next(this.groups.value.map((g) => (g.id === parsed.id ? { ...g, ...parsed } : g)));
    return of(parsed).pipe(delay(200));
  }

  deletePublicGroup(id: number[]): Observable<ResponseDeleteResource> {
    return this.baseCrudService.eliminateResources(this.groups, id);
  }
}
