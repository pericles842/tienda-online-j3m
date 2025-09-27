export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  phone: string;
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
  id_user: number;
  role_id: number;
  rol: string;
  module_id: number;
  module: string;
  can_view: number | boolean;
  can_create: number | boolean;
  can_update: number | boolean;
  can_delete: number | boolean;
}

export type LoginForm = {
  email: FormControl<string>;
  password: FormControl<string>;
  remember: FormControl<boolean>;
};

export interface LoginResponse {
  user: { id: number; name: string; last_name: string; email: string; role: string ,rol_id: number};
  accessToken: string;
}
