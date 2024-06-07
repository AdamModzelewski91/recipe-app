import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesTableComponent } from './recipes-table.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('RecipesTableComponent', () => {
  let component: RecipesTableComponent;
  let fixture: ComponentFixture<RecipesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RecipesTableComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecipesTableComponent);
    fixture.componentRef.setInput('recipesList', [])
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
