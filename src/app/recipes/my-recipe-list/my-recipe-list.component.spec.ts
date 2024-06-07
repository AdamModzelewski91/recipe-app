import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipeListComponent } from './my-recipe-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyRecipesService } from '../services/my-recipes.service';
import { MyRecipesServiceMock } from '../../mocks/my-recipes.service.mock';
import { PhotosService } from '../services/photos.service';
import { PhotosServiceMock } from '../../mocks/photo.service.mock';

describe('MyRecipeListComponent', () => {
  let component: MyRecipeListComponent;
  let fixture: ComponentFixture<MyRecipeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MyRecipeListComponent, BrowserAnimationsModule],
      providers: [
        { provide: MyRecipesService, useValue: MyRecipesServiceMock},
        { provide: PhotosService, useValue: PhotosServiceMock}
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
