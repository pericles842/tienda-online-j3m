export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
  phone_2: string;
  age: number;
  password: string;
  password_confirmation: string;
  ci: string;
  url_img: string | null;
  rol_id: number;
  public_group_id: number | null;
  state_id: number;
  city_id: number;
  parish_id: number;
  created_at: Date;
  savings_box: string | null;
  state: string;
  municipality: string;
  parish: string;
  role: string;
  permissions?: ChargesResponse[];
}

export type CreateUserTypeClient = Omit<
  User,
  'id',
  'url_img',
  'created_at',
  'savings_box',
  'state',
  'municipality',
  'parish',
  'role',
  'permissions'
>;

export interface ChargesResponse {
  id: number;
  id_user: number;
  role_id: number;
  rol: string;
  module_id: number;
  module: string;
  can_view: boolean;
  can_create: boolean;
  can_update: boolean;
  can_delete: boolean;
}

export type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
  remember: FormControl<boolean>;
};

export interface LoginResponse {
  user: UserLoginResponse;
  accessToken: string;
}

type UserLoginResponse = {
  id: number;
  name: string;
  last_name: string;
  email: string;
  role: string;
  rol_id: number;
};

/**
 *Interfaz para le auditoria de los usuarios
 *
 * @export
 * @interface UserTracking
 */
export interface UserTracking {
  user_create_id: number;
  user_update_id: number;
  email_user_create: string;
  email_user_update: string;
}
