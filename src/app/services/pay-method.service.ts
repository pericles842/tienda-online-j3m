import { PayMethod } from '@/interfaces/pay_method';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayMethodService {
  constructor(private http: HttpClient) {}

  createPayMethod(payMethod: FormData): Observable<PayMethod> {
    return this.http.post<PayMethod>(`${environment.host}/pay-methods`, payMethod);
  }
}
