export interface PayMethodMobilePay {
  code_bank: string;
  phone: string;
  documentation: number;
}
export interface PayMethodTransfer extends PayMethodMobilePay {
  num_account: string;
  type_account: 'ahorro' | 'corriente';
  type_person: 'natural' | 'juridica';
}

export interface PayMethodDigitalWallet {
  email: string;
}

export interface PayMethodData {
  id: number;
  name: string;
  type: TypePayMethod;
  datos: PayMethodMobilePay | PayMethodDigitalWallet | PayMethodTransfer;
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
