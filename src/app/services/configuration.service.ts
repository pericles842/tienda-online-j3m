import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DollarInformation } from '@/interfaces/configuration';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  constructor(private http: HttpClient) {}

  getRates(): DollarInformation[] {
    return [
      {
        id: 1,
        title: 'Dolar Bcv',
        key: 'bcv',
        last_update: '2021-06-21Z00:00:00',
        price_old: '105.34',
        price: 105.34,
        url_img: 'https://monitordolarvenezuela.com/img/logos/bcv.webp'
      },
      {
        id: 2,
        title: 'Dolar Binance',
        key: 'binance',
        last_update: '2021-06-21Z00:00:00',
        price_old: '240.34',
        price: 300.34,
        url_img: 'https://monitordolarvenezuela.com/img/logos/binance-logo.svg'
      }
    ];
  }
}
