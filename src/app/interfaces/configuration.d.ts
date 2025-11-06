export interface SystemConfiguration {
  id: number;
  automatic_rate: boolean;
  type_rate: TypeRate;
  rate_manual: number;
  email: string;
  phone: string;
  ig: string;
  fb: string;
}

/**
 *Información acerca de las tasas del dolar
 *
 * @export
 * @interface DollarInformation
 */
export interface DollarInformation {
  id: number;
  key: TypeRate;
  title: string;
  last_update: string;
  price_old: string;
  price: number;
  url_img: string;
}

export type TypeRate = 'bcv' | 'binance';

export type SystemConfigurationFormGroup = FormGroupControls<SystemConfiguration>;
