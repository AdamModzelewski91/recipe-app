import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateRecipeComponent } from './create-recipe.component';
import { MyRecipesService } from '../services/my-recipes.service';
import { MyRecipesServiceMock } from '../../mocks/my-recipes.service.mock';
import { PhotosService } from '../services/photos.service';
import { PhotosServiceMock } from '../../mocks/photo.service.mock';
import { ActivatedRoute } from '@angular/router';

describe('CreateRecipeComponent', () => {
  let component: CreateRecipeComponent;
  let fixture: ComponentFixture<CreateRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateRecipeComponent, BrowserAnimationsModule],
      providers: [
        { provide: MyRecipesService, useValue: MyRecipesServiceMock},
        { provide: PhotosService, useValue: PhotosServiceMock},
        { provide: ActivatedRoute, useValue: {snapshot:{params:{id: 'asdasd'}}}},
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
