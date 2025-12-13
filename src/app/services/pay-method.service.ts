import { PayMethodData } from '@/interfaces/pay_method';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayMethodService {
  constructor(private http: HttpClient) {}

  getPayMethods(): Observable<PayMethodData[]> {
    return this.http.get<PayMethodData[]>(`${environment.host}/pay-methods`);
  }
  createPayMethod(payMethod: FormData): Observable<PayMethodData> {
    return this.http.post<PayMethodData>(`${environment.host}/pay-methods`, payMethod);
  }
}
