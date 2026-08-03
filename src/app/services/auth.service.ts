import { ChargesResponse, LoginResponse, User } from '@/interfaces/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';
import { Modules } from '@/interfaces/modules';

/**
 * Usuario embebido dentro del token mock, incluye la permisología
 * completa para que `getPermissionsUser` pueda resolverla sin backend.
 */
export interface MockTokenUser {
    id: number;
    name: string;
    last_name: string;
    email: string;
    role: string;
    rol_id: number;
    permissions: ChargesResponse[];
}

function encodeMockSegment(value: unknown): string {
    return btoa(unescape(encodeURIComponent(JSON.stringify(value))));
}

/**
 * Genera un JWT falso (header.payload.firma) decodificable por JwtHelperService,
 * usado para simular sesiones autenticadas sin backend.
 */
export function createMockToken(user: MockTokenUser, expiresInSeconds = 60 * 60 * 8): string {
    const header = encodeMockSegment({ alg: 'HS256', typ: 'JWT' });
    const payload = encodeMockSegment({
        user,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + expiresInSeconds
    });
    return `${header}.${payload}.mock-signature-demo`;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private jwtHelper = new JwtHelperService();
    /**
     * Observable para notificar la expiración del token
     * @type {BehaviorSubject<boolean>}
     *
     * @private
     * @memberof AuthService
     */
    private sessionExpired$ = new BehaviorSubject<boolean>(false);

    /**
     *
     * Timer para notificar la expiración del token
     *
     * @private
     * @type {*}
     * @memberof AuthService
     */
    private expirationTimer: any;

    constructor(
        private confirmationService: ConfirmationService,
        private router: Router
    ) { }
    /**
     *Obtener el token del localstorage
     *
     * @return {string|null}
     * @memberof UserService
     */
    getToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    /**
     *Guardar el token en el localstorage
     *
     * @param {string} token
     * @memberof UserService
     */
    setToken(token: string) {
        localStorage.setItem('accessToken', token);
        const exp = this.getTokenExpiration(token); // calcula exp del JWT
        this.startExpirationCountdown(exp);
    }

    /**
     * Calcular la expiración del token
     *
     * @param {string} token
     * @return {*}  {number}
     * @memberof AuthService
     */
    getTokenExpiration(token: string): number {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000; // exp en ms
        } catch {
            return Date.now();
        }
    }

    /**
     * Iniciar el timer para notificar la expiración del token
     *
     * @private
     * @param {number} exp
     * @memberof AuthService
     */
    private startExpirationCountdown(exp: number) {
        if (this.expirationTimer) {
            clearTimeout(this.expirationTimer);
        }

        const now = Date.now();
        const timeout = exp - now;

        if (timeout > 0) {
            this.expirationTimer = setTimeout(() => {
                this.notifySessionExpired();
            }, timeout);
        } else {
            this.notifySessionExpired();
        }
    }
    /**
     *Setear usuario en el localstorage
     *
     * @param {LoginResponse['user']} user
     * @memberof UserService
     */
    setUser(user: LoginResponse['user']) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    /**
     *Obtiene el usuario
     *
     * @return {*}  {(User | null)}
     * @memberof AuthService
     */
    getUser(): User | null {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    /**
     *Verificar si el token expiró
     *
     * @param {string} [token]
     * @return {*}  {boolean}
     * @memberof UserService
     */
    isTokenExpired(token?: string): boolean {
        if (!token) token = this.getToken()!;
        if (!token) return true;
        return this.jwtHelper.isTokenExpired(token);
    }

    /**
     *Decodificar el token
     *
     * @param {string} [token]
     * @return {*}  {*}
     * @memberof UserService
     */
    decodeToken(token?: string): any {
        if (!token) token = this.getToken()!;
        if (!token) return null;
        return this.jwtHelper.decodeToken(token);
    }

    /**
     *Cerrar sesion
     *
     * @memberof UserService
     */
    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        this.router.navigate(['/landing']);
    }

    showSessionExpiredModal() {
        let timeout: any;
        let seconds = 20;

        // función que abre el modal con el mensaje actual
        const openConfirm = () => {
            this.confirmationService.confirm({
                message: `Tu sesión ha expirado. ¿Quieres continuar?
                Se cerrará en ${seconds} s`,
                header: 'Sesión expirada',
                icon: 'pi pi-exclamation-triangle',
                acceptLabel: 'Sí, continuar',
                rejectLabel: 'No, salir',
                rejectButtonProps: {
                    severity: 'contrast',
                },
                acceptButtonProps: {
                    severity: 'contrast'
                },

                accept: () => {
                    clearInterval(timeout);
                    //! ESTO SE DEBE COLOCAR NE L APETICION DE REFRESH
                    // this.setToken(this.getToken()!);
                    this.refreshToken().subscribe();
                    // o refresh token
                },
                reject: () => {
                    clearInterval(timeout);
                    this.logout();
                }
            });
        };

        // abrir la primera vez
        openConfirm();

        // 🔥 actualizar cada segundo
        timeout = setInterval(() => {
            seconds--;

            if (seconds <= 0) {
                clearInterval(timeout);
                this.confirmationService.close(); // cerrar modal
                this.logout(); // logout automático
            } else {
                // re-renderizar el modal con mensaje actualizado
                openConfirm();
            }
        }, 1000);
    }

    /**
     *expone observable para suscribirse al evento de expiración
     *
     * @return {*}  {Observable<boolean>}
     * @memberof AuthService
     */
    onSessionExpired(): Observable<boolean> {
        return this.sessionExpired$.asObservable();
    }

    /**
     * notifica al observable de expiración
     *
     * @memberof AuthService
     */
    notifySessionExpired() {
        this.sessionExpired$.next(true);
    }

    /**
     *Refresca la session, regenerando el token mock a partir de la sesión actual
     *
     * @return {*}  {Observable<string>}
     * @memberof AuthService
     */
    refreshToken(): Observable<string> {
        const currentToken = this.getToken();
        const decoded = currentToken ? this.decodeToken(currentToken) : null;

        if (!decoded?.user) {
            return of('').pipe(delay(200));
        }

        return of(decoded.user as MockTokenUser).pipe(
            delay(200),
            map((user) => {
                const newToken = createMockToken(user);
                this.setToken(newToken);
                return newToken;
            })
        );
    }

    getPermissionsUser(): ChargesResponse {
        const permissions = this.decodeToken().user.permissions as ChargesResponse[];
        const name_module_url = this.router.url.split('/').at(-1);
        const module_id = Modules[name_module_url as keyof typeof Modules]?.id;

        if (name_module_url === 'profile') {
            let { id, rol_id, role: rol } = this.decodeToken().user;

            return {
                ...id,
                ...rol_id,
                ...rol,
                id: 0,
                module_id: 0,
                module: 'profile',
                can_view: true,
                can_create: true,
                can_update: true,
                can_delete: true
            };
        }

        return permissions.find((permiso) => permiso.module_id === module_id) as ChargesResponse;
    }
}
