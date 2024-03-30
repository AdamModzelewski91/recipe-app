import { Injectable, signal } from '@angular/core';
import { ResponseGlobalRecipes, ResponseRecipeWithPhotos } from '../models/recipe.type';
import { MyRecipesService } from './my-recipes.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalRecipesService {

  globalRecipes = signal<ResponseGlobalRecipes[]>([
    {
      userId: "fgdfgdfgert",
      id: "13sda22wdqwd32",
      name: "Apple pie 1",
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
      photos: [],
      likes: 12,
      dislikes: 4,
    },
  ]);

  unpublishRecipe(index: number) {
    const toUnpublish = this.globalRecipes().splice(index, 1);
    // this.myRecipeService.myRecipes().push({...toUnpublish[0], publish: false });
  }
}
