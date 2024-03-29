import { JsonPipe } from '@angular/common';
import { Component, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ControlsOf, FormControl, FormGroup } from '@ngneat/reactive-forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { DragAndDropComponent } from '../components/drag-and-drop/drag-and-drop.component';
import { forbiddenCharsValidator } from '../../shared/validators/forbidden-chars-validator';
import { MyRecipesService } from '../services/my-recipes.service';
import { Router } from '@angular/router';
import { NutritionsTableComponent } from '../components/nutritions-table/nutritions-table.component';


@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
    MatSelectModule, 
    MatCardModule, 
    JsonPipe, 
    FormsModule, 
    ReactiveFormsModule, 
    DragAndDropComponent,
    NutritionsTableComponent,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  protected uploadedImages = model<HTMLImageElement[]>([]);

  form =  new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)]}),
    dish: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    difficult: new FormControl('', { nonNullable: true, validators: [Validators.required]}),
    prepTime: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.max(300), forbiddenCharsValidator(/[a-zA-Z]/i)]}),
    cookTime: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.max(300), forbiddenCharsValidator(/[a-zA-Z]/i)]}),
    serves: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.max(24), forbiddenCharsValidator(/[a-zA-Z]/i)]}),
    nutritions: new FormGroup({
      calories: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.max(9999), forbiddenCharsValidator(/[a-zA-Z]/i)]}),
      fat: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.max(1000), forbiddenCharsValidator(/[a-zA-Z]/i)]}),
      carbohydrate: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.max(1000), forbiddenCharsValidator(/[a-zA-Z]/i)]}),
      protein: new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.max(1000), forbiddenCharsValidator(/[a-zA-Z]/i)]}),
    })
  });

  constructor(
    private router: Router, 
    private myRecipesService: MyRecipesService, 
    private fb: FormBuilder,
  ) { }

  ngOnInit(){
    this.form.valueChanges.subscribe();
  }

  onSubmit() {
    if (this.form.invalid) return; 

    this.myRecipesService.addNewRecipe({...this.form.value, photos: this.uploadedImages()});
    this.router.navigate(['/'])
  }

  onResetForm() {
    this.form.reset();
    this.uploadedImages.set([]);
  }
}
