import { Modules } from '@/interfaces/modules';
import { AuthService } from '@/services/auth.service';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

// Función de interceptor (enfoque moderno a partir de Angular 15+)
export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const route = inject(Router);

  //si no existe la palabra pages pasar la solicitud
  if (!route.url.split('/').includes('pages')) return next(req);
  const name_module_url = route.url.split('/').at(-1); //obtenemos la palara final de la url

  // Obtener el token y el id del modulo
  const authToken = authService.getToken();
  const module_id = Modules[name_module_url as keyof typeof Modules]?.id;

  if (authToken && module_id) {
    const authReq = req.clone({
      headers: req.headers.set('authorization', `${authToken}`).set('module_id', `${module_id}`)
    });

    return next(authReq);
  }

  // Si no hay token, pasar la solicitud original sin modificar
  return next(req);
};