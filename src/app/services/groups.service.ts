import { Municipality, Parish, State } from '@/interfaces/cities';
import { PublicGroup } from '@/interfaces/groups';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseCrudService } from './base-crud.service';
import { ResponseDeleteResource } from '@/interfaces/forms';

@Injectable({
  providedIn: 'root'
})
export class PublicGroupsService {
  constructor(
    private http: HttpClient,
    private baseCrudService: BaseCrudService
  ) {}

  getPublicGroups(): Observable<PublicGroup[]> {
    return this.http.get<PublicGroup[]>(`${environment.host}/public_groups`);
  }

  createPublicGroup(group: FormData): Observable<PublicGroup> {
    return this.http.post<PublicGroup>(`${environment.host}/public_groups`, group);
  }

  updatePublicGroup(group: FormData): Observable<PublicGroup> {
    return this.http.put<PublicGroup>(`${environment.host}/public_groups`, group);
  }

  deletePublicGroup(id: number[]): Observable<ResponseDeleteResource> {
    return this.baseCrudService.eliminateResources('public_groups', id);
  }
}
