import { TestBed } from '@angular/core/testing';

import { MyRecipesService } from './my-recipes.service';
import { AuthService } from '../../shared/services/auth.service';
import { provideHttpClient } from '@angular/common/http';

describe('MyRecipesService', () => {
  let service: MyRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, AuthService},
        provideHttpClient()
      ]
    });
    service = TestBed.inject(MyRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
