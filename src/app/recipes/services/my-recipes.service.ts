import { Injectable, signal } from '@angular/core';
import { RecipeWithPhotos } from '../models/recipe.type';

@Injectable({
  providedIn: 'root'
})
export class MyRecipesService {

  myRecipes = signal<RecipeWithPhotos[]>([
    {
      name: "Apple pie",
      dish: "cake",
      difficult: "moderate",
      prepTime: "20",
      cookTime: "180",
      serves: "12",
      nutritions: {
        calories: "300",
        fat: "25",
        carbohydrate: "18",
        protein: "6"
      },
      photos: []
    },
    {
      name: "Apple pie",
      dish: "cake",
      difficult: "moderate",
      prepTime: "20",
      cookTime: "180",
      serves: "12",
      nutritions: {
        calories: "300",
        fat: "25",
        carbohydrate: "18",
        protein: "6"
      },
      photos: []
    },
    {
      name: "Apple pie",
      dish: "cake",
      difficult: "moderate",
      prepTime: "20",
      cookTime: "180",
      serves: "12",
      nutritions: {
        calories: "300",
        fat: "25",
        carbohydrate: "18",
        protein: "6"
      },
      photos: []
    },
  ])

  constructor() { }

  addNewRecipe(recipe: RecipeWithPhotos) {
    this.myRecipes().push(recipe);
  }
}
