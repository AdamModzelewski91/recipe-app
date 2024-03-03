import { JsonPipe } from '@angular/common';
import { Component,  effect,  model, signal } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';

import { DragAndDropComponent } from '../components/drag-and-drop/drag-and-drop.component';


@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule, JsonPipe, FormsModule, ReactiveFormsModule, DragAndDropComponent],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  protected uploadedImages = signal([])
}
