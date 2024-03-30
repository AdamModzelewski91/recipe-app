import { Injectable, WritableSignal, signal } from '@angular/core';
import { RecipeWithPhotos, ResponseRecipeWithPhotos } from '../models/recipe.type';
import { GlobalRecipesService } from './global-recipes.service';

@Injectable({
  providedIn: 'root'
})
export class MyRecipesService {

  myRecipes = signal<ResponseRecipeWithPhotos[]>([
    {
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
      photos: []
    },
    {
      id: "aaaa",
      name: "Apple pie 2",
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
      id: "1bbb",
      name: "Apple pie 3",
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
  ]);

  addRecipe(recipe: RecipeWithPhotos) {
    this.myRecipes().push({...recipe, id: 'asdadasd'});
  }

  getRecipe(id: string): ResponseRecipeWithPhotos {
    return this.myRecipes().find(x => x.id === id) as ResponseRecipeWithPhotos;
  }

  updateRecipe(recipe: ResponseRecipeWithPhotos): void {
    const index = this.myRecipes().findIndex(x => x.id === recipe.id);
    this.myRecipes().splice(index, 1, recipe);
  }

  publishRecipe(index: number): void {
    const toPublish = this.myRecipes().splice(index, 1);
    // this.globalRecipeList.globalRecipes().push({...toPublish[0], publish: true });
    // this.myRecipes.update(x => [{...x[index], publish: true}]);
  }

  deleteRecipe(index: number): void {
    this.myRecipes().splice(index, 1);
  }
}
