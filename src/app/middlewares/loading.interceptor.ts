import { LoadingService } from '@/services/loading.service';
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);
  // Activar loading
  loadingService.show();

  return next(req).pipe(
    finalize(() => {
      // Desactivar loading
      loadingService.hide();
    })
  );
};
