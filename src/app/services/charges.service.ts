import { SimpleCharges } from '@/interfaces/charges';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChargesService {
  constructor(private http: HttpClient) {}

  getRoles(): Observable<SimpleCharges[]> {
    return this.http.get<SimpleCharges[]>(`${environment.host}/roles`);
  }
}
