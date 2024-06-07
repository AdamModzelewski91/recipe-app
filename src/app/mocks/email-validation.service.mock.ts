import { of } from 'rxjs';

export const EmailValidationServiceMock = jasmine.createSpyObj(
  'EmailValidationService',
  ['validate'],
);

EmailValidationServiceMock.validate.and.returnValue(of(true));
