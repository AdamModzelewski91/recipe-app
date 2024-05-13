import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const cloned = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authService.token()),
  });

  return next(cloned).pipe(
    catchError((err) => {
      if (err.status === 401) {
        authService.logout();
      }
      return throwError(() => err);
    }),
  );
};
