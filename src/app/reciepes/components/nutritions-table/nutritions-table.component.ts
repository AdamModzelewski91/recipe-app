import { Component, OnInit } from '@angular/core';
import { ControlContainer, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgFor, NgIf, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-nutritions-table',
  standalone: true,
  imports: [MatInputModule, TitleCasePipe, MatCardModule, ReactiveFormsModule, NgIf, NgFor],
  templateUrl: './nutritions-table.component.html',
  styleUrl: './nutritions-table.component.scss'
})
export class NutritionsTableComponent implements OnInit{
  form!: FormGroup;

  nutritions = [
    { name: 'calories', unit: 'kJ/kcal'},
    { name: 'fat', unit: 'g'},
    { name: 'carbohydrate', unit: 'g'},
    { name: 'protein', unit: 'g'},
  ]

  constructor(private controlContainer: ControlContainer) {
  }
  ngOnInit(): void {  
    this.form = this.controlContainer.control as FormGroup;
  }
}
