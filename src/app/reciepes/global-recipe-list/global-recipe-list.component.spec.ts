import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalRecipeListComponent } from './global-recipe-list.component';

describe('GlobalRecipeListComponent', () => {
  let component: GlobalRecipeListComponent;
  let fixture: ComponentFixture<GlobalRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalRecipeListComponent]
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
