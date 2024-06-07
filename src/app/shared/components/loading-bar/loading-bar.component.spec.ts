import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingBarComponent } from './loading-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoadingBarComponent', () => {
  let component: LoadingBarComponent;
  let fixture: ComponentFixture<LoadingBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LoadingBarComponent, BrowserAnimationsModule]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
