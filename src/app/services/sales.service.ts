import { Sale } from '@/interfaces/sales';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { AuthService } from './auth.service';
import { ProductJ3mService } from './products.service';

const MOCK_SALES: Sale[] = [
    {
        id: 1,
        id_user: 3,
        total_usd: 12.5,
        total_bs: 456.25,
        rate_day: 36.5,
        reference: '000123456789',
        pay_method_id: 1,
        url_img: 'assets/images/logotipo.PNG',
        status: 'approved',
        approved_user_id: 1,
        rejected_user_id: null,
        updated_at: '2025-03-02',
        created_at: '2025-03-01'
    },
    {
        id: 2,
        id_user: 3,
        total_usd: 8.5,
        total_bs: 310.25,
        rate_day: 36.5,
        reference: '000987654321',
        pay_method_id: 2,
        url_img: 'assets/images/logotipo.PNG',
        status: 'pending',
        approved_user_id: null,
        rejected_user_id: null,
        updated_at: '2025-03-05',
        created_at: '2025-03-05'
    }
];

@Injectable({
    providedIn: 'root'
})
export class SalesService {
    private sales = new BehaviorSubject<Sale[]>(MOCK_SALES);

    constructor(
        private authService: AuthService,
        private productService: ProductJ3mService
    ) { }

    createPayment(payment: FormData): Observable<Sale> {
        const paymentData = JSON.parse((payment.get('payment') as string) || '{}');
        const payMethod = JSON.parse((payment.get('pay_method') as string) || '{}');
        const products: { id: number; quantity: number }[] = JSON.parse((payment.get('products') as string) || '[]');
        const rate = Number(payment.get('current_rate')) || 0;
        const image = payment.get('image');

        const productsSnapshot = this.productService.getProductsSnapshot();
        const total_usd = products.reduce((acc, item) => {
            const product = productsSnapshot.find((p) => p.id === item.id);
            return acc + (product ? product.price * item.quantity : 0);
        }, 0);

        const nextId = Math.max(0, ...this.sales.value.map((s) => s.id)) + 1;
        const created: Sale = {
            id: nextId,
            id_user: this.authService.getUser()?.id || 0,
            total_usd,
            total_bs: total_usd * rate,
            rate_day: rate,
            reference: paymentData.reference || '',
            pay_method_id: payMethod.id || 0,
            url_img: image instanceof File ? URL.createObjectURL(image) : '',
            status: 'pending',
            approved_user_id: null,
            rejected_user_id: null,
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString()
        };

        this.sales.next([...this.sales.value, created]);
        return of(created).pipe(delay(200));
    }
    getSales(): Observable<Sale[]> {
        return of(this.sales.value).pipe(delay(200));
    }
}
