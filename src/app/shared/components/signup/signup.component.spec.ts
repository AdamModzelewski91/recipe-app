import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';
import { AuthService } from '../../services/auth.service';
import { AuthServiceMock } from '../../../mocks/auth.service.mock';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmailValidationService } from '../../validators/email-validation.service';
import { provideHttpClient } from '@angular/common/http';
import { EmailValidationServiceMock } from '../../../mocks/email-validation.service.mock';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupComponent, BrowserAnimationsModule],
      providers: [
        { provide: AuthService, useValue: AuthServiceMock},
        { provide: EmailValidationService, useValue: EmailValidationServiceMock},
        provideHttpClient()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
