import { PayMethodData } from '@/interfaces/pay_method';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import { BaseCrudService } from './base-crud.service';
import { ResponseDeleteResource } from '@/interfaces/forms';

const MOCK_PAY_METHODS: PayMethodData[] = [
  {
    id: 1,
    name: 'Banco de Venezuela (0102)',
    type: 'pagomovil',
    datos: { name_bank: 'Banco de Venezuela', code_bank: '0102', phone: '0412-0000000', documentation: 12345678 },
    holder: 'Jose Gutierrez',
    url_img: 'assets/images/logotipo.PNG',
    created_at: '2025-01-12'
  },
  {
    id: 2,
    name: 'Zelle',
    type: 'billetera_digital',
    datos: { email: 'pagos@j3m.com' },
    holder: 'J3M Tienda C.A.',
    url_img: 'assets/images/logotipo.PNG',
    created_at: '2025-02-01'
  },
  {
    id: 3,
    name: 'Banesco Transferencia',
    type: 'tranferencia',
    datos: {
      name_bank: 'Banesco',
      code_bank: '0134',
      phone: '0424-1111111',
      documentation: 87654321,
      num_account: '01340000000000000000',
      type_account: 'corriente',
      type_person: 'juridica'
    },
    holder: 'J3M Tienda C.A.',
    url_img: 'assets/images/logotipo.PNG',
    created_at: '2025-02-10'
  }
];

function parsePayMethodFormData(payMethod: FormData): PayMethodData {
  const parsed = JSON.parse(payMethod.get('pay_method') as string) as PayMethodData;
  const image = payMethod.get('image');

  return {
    ...parsed,
    url_img: image instanceof File ? URL.createObjectURL(image) : parsed.url_img
  };
}

@Injectable({
  providedIn: 'root'
})
export class PayMethodService {
  private payMethods = new BehaviorSubject<PayMethodData[]>(MOCK_PAY_METHODS);

  constructor(private baseCrudService: BaseCrudService) {}

  getPayMethods(): Observable<PayMethodData[]> {
    return of(this.payMethods.value).pipe(delay(200));
  }

  getPublicPayMethods(): Observable<PayMethodData[]> {
    return of(this.payMethods.value).pipe(delay(200));
  }

  createPayMethod(payMethod: FormData): Observable<PayMethodData> {
    const parsed = parsePayMethodFormData(payMethod);
    const nextId = Math.max(0, ...this.payMethods.value.map((p) => p.id)) + 1;
    const created: PayMethodData = { ...parsed, id: nextId, created_at: new Date().toISOString() };

    this.payMethods.next([...this.payMethods.value, created]);
    return of(created).pipe(delay(200));
  }

  updatePayMethod(payMethod: FormData): Observable<PayMethodData> {
    const parsed = parsePayMethodFormData(payMethod);
    this.payMethods.next(this.payMethods.value.map((p) => (p.id === parsed.id ? { ...p, ...parsed } : p)));
    return of(parsed).pipe(delay(200));
  }

  deletePayMethod(id: number[]): Observable<ResponseDeleteResource> {
    return this.baseCrudService.eliminateResources(this.payMethods, id);
  }
}
