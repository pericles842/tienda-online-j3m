import { Sale } from '@/interfaces/sales';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    constructor(private http: HttpClient) { }

    createPayment(payment: FormData): Observable<any> {
        return this.http.post(`${environment.host}/payment`, payment);
    }
    getSales(): Observable<Sale[]> {
        return this.http.get<Sale[]>(`${environment.host}/sales`);
    }
}
