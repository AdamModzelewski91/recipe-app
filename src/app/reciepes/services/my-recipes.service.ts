import { Injectable, signal } from '@angular/core';
import { RecipeWithPhotos } from '../models/recipe.type';

@Injectable({
  providedIn: 'root'
})
export class MyRecipesService {

  myRecipes = signal<RecipeWithPhotos[]>([])

  constructor() { }

  addNewRecipe(recipe: RecipeWithPhotos) {
    this.myRecipes().push(recipe);
  }
}
