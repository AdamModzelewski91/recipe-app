import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecipeListComponent } from './my-recipe-list.component';

describe('MyRecipeListComponent', () => {
  let component: MyRecipeListComponent;
  let fixture: ComponentFixture<MyRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyRecipeListComponent]
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
