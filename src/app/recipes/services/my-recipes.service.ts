import { Injectable, signal } from '@angular/core';
import { RecipeWithPhotos, MyRecipes } from '../models/recipe.type';

@Injectable({
  providedIn: 'root',
})
export class MyRecipesService {
  myRecipes = signal<MyRecipes[]>([
    {
      id: '13sda22wdqwd32',
      name: 'Apple pie 1',
      dish: 'cake',
      difficult: 'moderate',
      prepTime: '20',
      cookTime: '180',
      serves: '12',
      nutritions: {
        calories: '300',
        fat: '25',
        carbohydrate: '18',
        protein: '6',
      },
      photos: [],
      published: true,
    },
    {
      id: 'aaaa',
      name: 'Apple pie 2',
      dish: 'cake',
      difficult: 'moderate',
      prepTime: '20',
      cookTime: '180',
      serves: '12',
      nutritions: {
        calories: '300',
        fat: '25',
        carbohydrate: '18',
        protein: '6',
      },
      photos: [],
      published: false,
    },
    {
      id: '1bbb',
      name: 'Apple pie 3',
      dish: 'cake',
      difficult: 'moderate',
      prepTime: '20',
      cookTime: '180',
      serves: '12',
      nutritions: {
        calories: '300',
        fat: '25',
        carbohydrate: '18',
        protein: '6',
      },
      photos: [],
      published: true,
    },
  ]);

  addRecipe(recipe: RecipeWithPhotos) {
    this.myRecipes().push({ ...recipe, id: 'asdadasd', published: false });
  }

  getRecipe(id: string): MyRecipes {
    return this.myRecipes().find((x) => x.id === id) as MyRecipes;
  }

  updateRecipe(recipe: MyRecipes): void {
    const index = this.myRecipes().findIndex((x) => x.id === recipe.id);
    this.myRecipes().splice(index, 1, recipe);
  }

  publishRecipe(index: number): void {
    this.myRecipes()[index].published = true;
  }

  unpublishRecipe(index: number): void {
    this.myRecipes()[index].published = false;
  }

  deleteRecipe(index: number): void {
    this.myRecipes().splice(index, 1);
  }
}
