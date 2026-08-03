import { Injectable, Signal } from '@angular/core';
import { DollarInformation, SystemConfiguration } from '@/interfaces/configuration';
import { BehaviorSubject, delay, forkJoin, map, Observable, of } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

const MOCK_RATES: DollarInformation[] = [
  { id: 1, key: 'bcv', title: 'Tasa BCV', last_update: new Date().toDateString(), price_old: '36.10', price: 36.5, url_img: 'assets/images/logotipo.PNG' },
  { id: 2, key: 'binance', title: 'Tasa Binance', last_update: new Date().toDateString(), price_old: '37.80', price: 38.2, url_img: 'assets/images/logotipo.PNG' },
  { id: 3, key: 'manual', title: 'Tasa manual', last_update: new Date().toDateString(), price_old: '36.00', price: 36.0, url_img: 'assets/images/logotipo.PNG' }
];

const MOCK_CONFIGURATION: SystemConfiguration = {
  id: 1,
  automatic_rate: true,
  type_rate: 'bcv',
  rate_manual: 36,
  email: 'contacto@j3m.com',
  phone: '0212-1234567',
  ig: '@j3m.tienda',
  fb: 'j3m.tienda'
};

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  getPriceDolarConfiguration: Signal<DollarInformation | null>;

  private rates = new BehaviorSubject<DollarInformation[]>(MOCK_RATES);
  private configuration = new BehaviorSubject<SystemConfiguration>(MOCK_CONFIGURATION);

  constructor() {
    this.getPriceDolarConfiguration = toSignal(
      forkJoin({
        config: this.getPublicConfiguration(),
        rates: this.getRates()
      }).pipe(
        map(({ config, rates }) => {
          // 1. Blindaje: Si config no existe, retornamos un valor seguro o null
          if (!config) return null;

          // 2. Uso de Optional Chaining para evitar el error de "null"
          if (!config?.automatic_rate) {
            return {
              id: 0,
              key: 'manual',
              title: 'Tasa manual',
              last_update: new Date().toDateString(),
              price_old: config?.rate_manual?.toString() || '0',
              price: config?.rate_manual || 0,
              url_img: ''
            } satisfies DollarInformation;
          }

          // 3. Validación de rates
          return rates?.find((r) => r.key === config.type_rate) ?? null;
        })
      ),
      { initialValue: null }
    );
  }

  calculatePriceForBs(price_of_dollar: number) {
    const rate = this.getPriceDolarConfiguration();
    // 4. Si el signal aún es null, devolvemos 0 para no romper los cálculos en el HTML
    if (!rate) return 0;
    return price_of_dollar * rate.price;
  }

  getRates(): Observable<DollarInformation[]> {
    return of(this.rates.value).pipe(delay(200));
  }

  /**
   *Obtiene una configuration para usarse en el formulario
   *
   * @return {*}  {Observable<SystemConfiguration>}
   * @memberof ConfigurationService
   */
  getConfiguration(): Observable<SystemConfiguration> {
    return of(this.configuration.value).pipe(delay(200));
  }

  updateConfiguration(configuration: SystemConfiguration): Observable<SystemConfiguration> {
    this.configuration.next(configuration);
    return of(configuration).pipe(delay(200));
  }

  /**
   * obtiene una configuracion publica
   *
   * @return {*}  {Observable<SystemConfiguration>}
   * @memberof ConfigurationService
   */
  getPublicConfiguration(): Observable<SystemConfiguration> {
    return of(this.configuration.value).pipe(delay(200));
  }
}
