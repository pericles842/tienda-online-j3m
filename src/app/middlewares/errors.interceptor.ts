import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

export const errorsInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const router = inject(Router);
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error desconocido.';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente o de la red
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor (códigos HTTP)
        switch (error.status) {
          case 401: // No autorizado
            errorMessage = 'Sesión expirada o credenciales inválidas. Por favor, inicie sesión de nuevo.';
            break;
          case 403: // Prohibido (No tiene permisos)
            errorMessage = 'Acceso denegado. No tiene permisos para esta acción.';
            break;
          case 404: // No encontrado
            errorMessage = `Recurso no encontrado: ${error.url}`;
            break;
          case 500: // Error interno del servidor
            errorMessage = 'Error interno del servidor. Inténtelo más tarde.';
            break;
        }
      }

      messageService.add({ severity: 'error', summary: 'Error', detail: error.error.error, life: 0, sticky: true  });

      // Devolver un observable con el error para que sea manejado por el componente que hizo la solicitud
      return throwError(() => new Error(errorMessage));
    })
  );
};
