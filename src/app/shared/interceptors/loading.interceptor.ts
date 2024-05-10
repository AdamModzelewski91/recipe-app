import { HttpContextToken, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, delay, finalize, throwError } from 'rxjs';
import { LoadingSpinnerService } from '../services/loading-spinner.service';
import { LoadingBarService } from '../services/loading-bar.service';

export const SkipLoading = new HttpContextToken<boolean>(() => false);
export const LoadingBar = new HttpContextToken<boolean>(() => false);

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingSpinnerService = inject(LoadingSpinnerService);
  const loadingBarService = inject(LoadingBarService);

  if (req.context.get(LoadingBar)) {
    loadingBarService.loadingOn();

    return next(req).pipe(
      delay(250),
      finalize(() => {
        loadingBarService.loadingOff();
      }),
    );
  }

  if (req.context.get(SkipLoading)) {
    return next(req);
  }

  loadingSpinnerService.loadingOn();
  return next(req).pipe(
    delay(250),
    finalize(() => {
      loadingSpinnerService.loadingOff();
    }),
  );
};
