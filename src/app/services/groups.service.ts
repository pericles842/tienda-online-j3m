import { Municipality, Parish, State } from '@/interfaces/cities';
import { PublicGroup } from '@/interfaces/groups';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicGroupsService {
  constructor(private http: HttpClient) {}

  getPublicGroups(): Observable<PublicGroup[]> {
    return this.http.get<PublicGroup[]>(`${environment.host}/public_groups`);
  }

  createPublicGroup(group: FormData): Observable<PublicGroup> {
    return this.http.post<PublicGroup>(`${environment.host}/public_groups`, group);
  }

  updatePublicGroup(group: FormData): Observable<PublicGroup> {
    return this.http.put<PublicGroup>(`${environment.host}/public_groups`, group);
  }
}
