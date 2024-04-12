import { Injectable, signal } from '@angular/core';
import { GlobalRecipes } from '../models/recipe.type';

@Injectable({
  providedIn: 'root',
})
export class GlobalRecipesService {
  globalRecipes = signal<GlobalRecipes[]>([
    {
      userId: 'fgdfgdfgert',
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
      votes: {
        likes: 12,
        dislikes: 4,
        liked: false,
        disliked: false,
      },
      published: true,
    },
  ]);

  likeRecipe(index: number): void {
    if (this.globalRecipes()[index].votes.liked) return;

    if (this.globalRecipes()[index].votes.disliked) {
      this.globalRecipes()[index].votes.dislikes--;
    }

    this.globalRecipes()[index].votes.likes++;
    this.globalRecipes()[index].votes.liked = true;
    this.globalRecipes()[index].votes.disliked = false;
  }

  dislikeRecipe(index: number): void {
    if (this.globalRecipes()[index].votes.disliked) return;

    if (this.globalRecipes()[index].votes.liked) {
      this.globalRecipes()[index].votes.likes--;
    }

    this.globalRecipes()[index].votes.dislikes++;
    this.globalRecipes()[index].votes.liked = false;
    this.globalRecipes()[index].votes.disliked = true;
  }
}
