import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SkipLoading } from '../interceptors/loading.interceptor';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class EmailValidationService implements AsyncValidator {
  isLoading = signal(false);
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl<any, any>,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    this.isLoading.set(true);
    return this.http
      .get(APIUrl + '/check-email?email=' + control.value, {
        context: new HttpContext().set(SkipLoading, true),
      })
      .pipe(
        map((isTaken) => (isTaken ? { emailUnavailable: true } : null)),
        tap(() => this.isLoading.set(false)),
        catchError(() => of(null)),
      );
  }
}
