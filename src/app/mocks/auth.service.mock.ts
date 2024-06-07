import { signal } from '@angular/core';
import { of } from 'rxjs';

export const AuthServiceMock = jasmine.createSpyObj('AuthService', [
  'checkLogged',
  'login',
  'logout',
  'signup',
]);

AuthServiceMock.login.and.returnValue(of([]));

AuthServiceMock.isLogged = signal(false);
