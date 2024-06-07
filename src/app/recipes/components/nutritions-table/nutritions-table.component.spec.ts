import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NutritionsTableComponent } from './nutritions-table.component';
import { ControlContainer, FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NutritionsTableComponent', () => {
  let component: NutritionsTableComponent;
  let fixture: ComponentFixture<NutritionsTableComponent>;
  const fg: FormGroup = new FormGroup({
    calories: new FormControl(''),
    fat: new FormControl(''),
    carbohydrate: new FormControl(''),
    protein: new FormControl(''),
  })

  const fgd = new FormGroupDirective([], [])
  fgd.form = fg
  beforeEach(() => {
     TestBed.configureTestingModule({
      imports: [NutritionsTableComponent, BrowserAnimationsModule],
      providers: [
        {provide: ControlContainer, useValue: fgd}
      ]
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
