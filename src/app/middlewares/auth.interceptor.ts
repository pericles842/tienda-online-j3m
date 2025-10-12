import { AuthService } from '@/services/auth.service';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
 

// Función de interceptor (enfoque moderno a partir de Angular 15+)
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService); // Inyectar el servicio

  // 1. Obtener el token (asumiendo que AuthService tiene un método getToken)
  const authToken = authService.getToken(); 

  if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('authorization', `${authToken}`)
    });
    
    // 3. Pasar la solicitud clonada al siguiente manejador
    return next(authReq);
  }

  // Si no hay token, pasar la solicitud original sin modificar
  return next(req);
};