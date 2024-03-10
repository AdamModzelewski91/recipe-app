import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionsTableComponent } from './nutritions-table.component';

describe('NutritionsTableComponent', () => {
  let component: NutritionsTableComponent;
  let fixture: ComponentFixture<NutritionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NutritionsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NutritionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
