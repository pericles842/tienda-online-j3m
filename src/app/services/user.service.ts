import { CreateUserTypeClient, LoginResponse, User } from '@/interfaces/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of, throwError } from 'rxjs';
import { createMockToken } from './auth.service';
import { buildPermissions } from './charges.service';

/**
 * Credenciales de prueba para el demo (mostradas en la pantalla de Login).
 */
export const DEMO_CREDENTIALS = {
  email: 'admin@j3m.com',
  password: 'Admin123'
};

const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Jorge',
    last_name: 'Administrador',
    email: DEMO_CREDENTIALS.email,
    phone: '0412-0000000',
    phone_2: '',
    age: 32,
    password: DEMO_CREDENTIALS.password,
    password_confirmation: DEMO_CREDENTIALS.password,
    ci: 'V-12345678',
    url_img: 'assets/images/logotipo.PNG',
    rol_id: 1,
    public_group_id: null,
    state_id: 1,
    city_id: 1,
    parish_id: 1,
    created_at: new Date('2025-01-10'),
    savings_box: null,
    state: 'Distrito Capital',
    municipality: 'Libertador',
    parish: 'Catedral',
    role: 'Administrador',
    permissions: buildPermissions(1, 'Administrador', 'full')
  },
  {
    id: 2,
    name: 'Maria',
    last_name: 'Vendedora',
    email: 'vendedor@j3m.com',
    phone: '0414-1111111',
    phone_2: '',
    age: 27,
    password: 'Vendedor123',
    password_confirmation: 'Vendedor123',
    ci: 'V-23456789',
    url_img: 'assets/images/logotipo.PNG',
    rol_id: 2,
    public_group_id: null,
    state_id: 1,
    city_id: 1,
    parish_id: 1,
    created_at: new Date('2025-02-05'),
    savings_box: null,
    state: 'Distrito Capital',
    municipality: 'Libertador',
    parish: 'Catedral',
    role: 'Vendedor',
    permissions: buildPermissions(2, 'Vendedor', 'sales')
  },
  {
    id: 3,
    name: 'Carlos',
    last_name: 'Cliente',
    email: 'cliente@j3m.com',
    phone: '0424-2222222',
    phone_2: '',
    age: 24,
    password: 'Cliente123',
    password_confirmation: 'Cliente123',
    ci: 'V-34567890',
    url_img: 'assets/images/logotipo.PNG',
    rol_id: 6,
    public_group_id: null,
    state_id: 2,
    city_id: 3,
    parish_id: 5,
    created_at: new Date('2025-03-18'),
    savings_box: null,
    state: 'Miranda',
    municipality: 'Chacao',
    parish: 'Chacao',
    role: 'Cliente',
    permissions: buildPermissions(6, 'Cliente', 'readonly')
  }
];

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users = new BehaviorSubject<User[]>(MOCK_USERS);

  /**
   *Crear un usuario
   *
   *
   * @param {CreateUserTypeClient} user
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  createUser(user: CreateUserTypeClient): Observable<User> {
    const nextId = Math.max(0, ...this.users.value.map((u) => u.id)) + 1;
    const created: User = {
      ...(user as unknown as User),
      id: nextId,
      created_at: new Date(),
      permissions: buildPermissions((user as unknown as User).rol_id, (user as unknown as User).role || 'Vendedor', 'sales')
    };

    this.users.next([...this.users.value, created]);
    return of(created).pipe(delay(200));
  }

  /**
   *Crea un cliente servicio dedicado par ala pagina web
   *
   * @param {CreateUserTypeClient} user
   * @return {*}
   * @memberof UserService
   */
  createClient(user: CreateUserTypeClient): Observable<User> {
    const nextId = Math.max(0, ...this.users.value.map((u) => u.id)) + 1;
    const created: User = {
      ...(user as unknown as User),
      id: nextId,
      rol_id: 6,
      role: 'Cliente',
      created_at: new Date(),
      permissions: buildPermissions(6, 'Cliente', 'readonly')
    };

    this.users.next([...this.users.value, created]);
    return of(created).pipe(delay(200));
  }

  deleteUser(id: number): Observable<number> {
    this.users.next(this.users.value.filter((user) => user.id !== id));
    return of(id).pipe(delay(200));
  }

  /**
   *Obtiene a un usuario
   *
   * @param {number} id
   * @return {*}  {Observable<User>}
   * @memberof UserService
   */
  getUser(id: number): Observable<User> {
    const user = this.users.value.find((u) => u.id === id);
    return user ? of(user).pipe(delay(200)) : throwError(() => new Error('Usuario no encontrado')).pipe(delay(200));
  }
  /**
   *Elimina un grupo de usuarios
   *
   * @param {number[]} ids
   * @return {*}  {Observable<{ ids_array: number[] }>}
   * @memberof UserService
   */
  deleteGroupUsers(id: number[]): Observable<{ ids_array: number[] }> {
    this.users.next(this.users.value.filter((user) => !id.includes(user.id)));
    return of({ ids_array: id }).pipe(delay(200));
  }

  /**
   *Edita un usuario
   *
   * @param {CreateUserTypeClient} user
   * @return {*}
   * @memberof UserService
   */
  updateUser(user: CreateUserTypeClient) {
    const updated = user as unknown as User;
    this.users.next(this.users.value.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
    return of(updated).pipe(delay(200));
  }
  /**
   *Edita el perfil de un cliente
   *
   * @param {CreateUserTypeClient} user
   * @return {*}
   * @memberof UserService
   */
  editClient(user: CreateUserTypeClient) {
    const updated = user as unknown as User;
    this.users.next(this.users.value.map((u) => (u.id === updated.id ? { ...u, ...updated } : u)));
    return of(updated).pipe(delay(200));
  }

  /**
   *Lista los usuarios
   *
   * @return {*}  {Observable<User[]>}
   * @memberof UserService
   */
  listUsers(): Observable<User[]> {
    return of(this.users.value).pipe(delay(200));
  }

  /**
   *Autenticar un usuario
   *
   * @param {{ email: string; password: string }} user
   * @return {*}  {Observable<LoginResponse>}
   * @memberof UserService
   */
  authUser(user: { email: string; password: string }): Observable<LoginResponse> {
    const found = this.users.value.find(
      (u) => u.email.toLowerCase() === user.email.toLowerCase() && u.password === user.password
    );

    if (!found) {
      return throwError(() => new Error('Credenciales inválidas')).pipe(delay(200));
    }

    const loginUser: LoginResponse['user'] = {
      id: found.id,
      name: found.name,
      last_name: found.last_name,
      email: found.email,
      role: found.role,
      rol_id: found.rol_id
    };

    const accessToken = createMockToken({
      ...loginUser,
      permissions: found.permissions || []
    });

    return of({ user: loginUser, accessToken }).pipe(delay(200));
  }
}
