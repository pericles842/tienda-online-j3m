export interface PayMethod {
  id: number;
  name: string;
  type: TypePayMethod;
  datos: { [key: string]: string };
  holder: string;
  url_img: string;
  created_at: string;
}

/**
 *Interfaz para seleccionar el tipo de metodo de pago a crear
 *
 * @export
 * @interface PaymentTypeSelector
 */
export interface PaymentTypeSelector {
  id: number;
  label: string;
  type: TypePayMethod;
  description?: string;
}

export type TypePayMethod = 'pagomovil' | 'transferencia' | 'billetera_digital' | 'divisa';

export type PayMethodForm = FormGroupControls<PayMethod>;
