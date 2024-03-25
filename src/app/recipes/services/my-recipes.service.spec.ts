import { TestBed } from '@angular/core/testing';

import { MyRecipesService } from './my-recipes.service';

describe('MyRecipesService', () => {
  let service: MyRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
