import { PayMethodData } from '@/interfaces/pay_method';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseCrudService } from './base-crud.service';
import { ResponseDeleteResource } from '@/interfaces/forms';

@Injectable({
  providedIn: 'root'
})
export class PayMethodService {
  constructor(
    private http: HttpClient,
    private baseCrudService: BaseCrudService
  ) {}

  getPayMethods(): Observable<PayMethodData[]> {
    return this.http.get<PayMethodData[]>(`${environment.host}/pay-methods`);
  }

  getPublicPayMethods(): Observable<PayMethodData[]> {
    return this.http.get<PayMethodData[]>(`${environment.host}/public-pay-methods`);
  }
  createPayMethod(payMethod: FormData): Observable<PayMethodData> {
    return this.http.post<PayMethodData>(`${environment.host}/pay-methods`, payMethod);
  }

  updatePayMethod(payMethod: FormData): Observable<PayMethodData> {
    return this.http.put<PayMethodData>(`${environment.host}/pay-methods`, payMethod);
  }

  deletePayMethod(id: number[]): Observable<ResponseDeleteResource> {
    return this.baseCrudService.eliminateResources('pay-methods', id);
  }
}
