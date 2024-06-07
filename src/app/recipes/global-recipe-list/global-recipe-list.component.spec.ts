import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GlobalRecipeListComponent } from './global-recipe-list.component';
import { GlobalRecipesService } from '../services/global-recipes.service';
import { PhotosService } from '../services/photos.service';
import { AuthService } from '../../shared/services/auth.service';

import { GlobalRecipesServiceMock } from '../../mocks/global-recipes.service.mock';
import { AuthServiceMock } from '../../mocks/auth.service.mock';
import { PhotosServiceMock } from '../../mocks/photo.service.mock';


describe('GlobalRecipeListComponent', () => {
  let component: GlobalRecipeListComponent;
  let fixture: ComponentFixture<GlobalRecipeListComponent>;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [GlobalRecipeListComponent, BrowserAnimationsModule],
      providers: [
        { provide: GlobalRecipesService, useValue: GlobalRecipesServiceMock },
        { provide: PhotosService, useValue: PhotosServiceMock },
        { provide: AuthService, useValue: AuthServiceMock }
      ],

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
