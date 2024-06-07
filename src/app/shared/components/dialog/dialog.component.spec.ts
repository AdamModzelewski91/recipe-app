import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponent } from './dialog.component';
import { Dialog } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DialogComponent', () => {
  let component: DialogComponent;
  let fixture: ComponentFixture<DialogComponent>;

  beforeEach(() => {
   TestBed.configureTestingModule({
      imports: [DialogComponent, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {
          title: 'SDAsdad', test:'asdas'
        } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
