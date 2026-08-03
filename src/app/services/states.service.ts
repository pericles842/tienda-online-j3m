import { Municipality, Parish, State } from '@/interfaces/cities';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

const MOCK_STATES: State[] = [
  { id: 1, name: 'Distrito Capital' },
  { id: 2, name: 'Miranda' },
  { id: 3, name: 'Carabobo' },
  { id: 4, name: 'Zulia' }
];

const MOCK_MUNICIPALITIES: Municipality[] = [
  { id: 1, name: 'Libertador', state_id: 1 },
  { id: 2, name: 'Chacao', state_id: 2 },
  { id: 3, name: 'Baruta', state_id: 2 },
  { id: 4, name: 'Valencia', state_id: 3 },
  { id: 5, name: 'Maracaibo', state_id: 4 }
];

const MOCK_PARISHES: Parish[] = [
  { id: 1, name: 'Catedral', city_id: 1 },
  { id: 2, name: 'Altagracia', city_id: 1 },
  { id: 3, name: 'Chacao', city_id: 2 },
  { id: 4, name: 'Las Mercedes', city_id: 3 },
  { id: 5, name: 'San José', city_id: 4 },
  { id: 6, name: 'Coquivacoa', city_id: 5 }
];

@Injectable({
  providedIn: 'root'
})
export class StatesService {
  getStates(): Observable<State[]> {
    return of(MOCK_STATES).pipe(delay(200));
  }

  getMunicipalices(id_state: number): Observable<Municipality[]> {
    return of(MOCK_MUNICIPALITIES.filter((m) => m.state_id === id_state)).pipe(delay(200));
  }

  getParishes(id_city: number): Observable<Parish[]> {
    return of(MOCK_PARISHES.filter((p) => p.city_id === id_city)).pipe(delay(200));
  }
}
