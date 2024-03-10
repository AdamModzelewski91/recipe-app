export type Recipe = {
  name: string;
  dish: string;
  difficult: string;
  prepTime: string;
  cookTime: string;
  serves: string;
  nutritions: Nutritions;
}

export type Nutritions = {
  calories: string,
  fat: string,
  carbohydrate: string,
  protein: string,
}

export interface RecipeWithPhotos extends Recipe {
  photos: HTMLImageElement[];
}