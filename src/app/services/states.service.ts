import { Municipality, Parish, State } from '@/interfaces/cities';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  constructor(private http: HttpClient) {}

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${environment.host}/states`);
  }

  getMunicipalices(id_state: number): Observable<Municipality[]> {
    return this.http.get<Municipality[]>(`${environment.host}/cities/${id_state}`);
  }

  getParishes(id_city: number): Observable<Parish[]> {
    return this.http.get<Parish[]>(`${environment.host}/parishes/${id_city}`);
  }
}
