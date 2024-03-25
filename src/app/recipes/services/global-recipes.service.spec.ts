import { TestBed } from '@angular/core/testing';

import { GlobalRecipesService } from './global-recipes.service';

describe('GlobalRecipesService', () => {
  let service: GlobalRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
