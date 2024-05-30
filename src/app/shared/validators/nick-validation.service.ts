import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
} from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { SkipLoading } from '../interceptors/loading.interceptor';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class NickValidationService implements AsyncValidator {
  constructor(private http: HttpClient) {}

  validate(
    control: AbstractControl<any, any>,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.http
      .get(APIUrl + '/check-nick?nick=' + control.value, {
        context: new HttpContext().set(SkipLoading, true),
      })
      .pipe(
        map((isTaken) => (isTaken ? { nickUnavailable: true } : null)),
        catchError(() => of(null)),
      );
  }
}
