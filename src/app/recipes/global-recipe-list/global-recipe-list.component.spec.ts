import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalRecipeListComponent } from './global-recipe-list.component';
import { GlobalRecipesService } from '../services/global-recipes.service';
import { PhotosService } from '../services/photos.service';
import { AuthService } from '../../shared/services/auth.service';
import { of } from 'rxjs';
import { GlobalRecipesServiceMock } from '../../mocks/global-recipes.service.mock';

fdescribe('GlobalRecipeListComponent', () => {
  let component: GlobalRecipeListComponent;
  let fixture: ComponentFixture<GlobalRecipeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GlobalRecipeListComponent],
      providers: [
        { provide: GlobalRecipesService, useClass: GlobalRecipesServiceMock },
        { provide: PhotosService, useValue: {} },
        { provide: AuthService, useValue: {} }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GlobalRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
