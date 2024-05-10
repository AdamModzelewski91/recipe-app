import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const cloned = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authService.token()),
  });

  return next(cloned);
};
