export interface CreateCharge {
  id: number;
  name: string;
  description: string;
  permissions: ChargesResponse[];
}

/**
 *Para los roles simples
 *
 * @export
 * @interface SimpleCharge
 */
export interface SimpleCharge {
  id: number;
  name: string;
  description: string;
  created_at: string;
}
