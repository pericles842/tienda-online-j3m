import { Injectable, Signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DollarInformation, SystemConfiguration } from '@/interfaces/configuration';
import { environment } from 'src/environments/environment';
import { forkJoin, map, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  getPriceDolarConfiguration: Signal<DollarInformation | null>;

  constructor(private http: HttpClient) {
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
    return this.http.get<DollarInformation[]>(`${environment.host}/rate-dollar-j3m`);
  }

  /**
   *Obtiene una configuration para usarse en el formulario
   *
   * @return {*}  {Observable<SystemConfiguration>}
   * @memberof ConfigurationService
   */
  getConfiguration(): Observable<SystemConfiguration> {
    return this.http.get<SystemConfiguration>(`${environment.host}/configuration`);
  }

  updateConfiguration(configuration: SystemConfiguration): Observable<SystemConfiguration> {
    return this.http.put<SystemConfiguration>(`${environment.host}/configuration`, configuration);
  }

  /**
   * obtiene una configuracion publica
   *
   * @return {*}  {Observable<SystemConfiguration>}
   * @memberof ConfigurationService
   */
  getPublicConfiguration(): Observable<SystemConfiguration> {
    return this.http.get<SystemConfiguration>(`${environment.host}/configuration-public`);
  }
}
