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

export interface ResponseRecipeWithPhotos extends RecipeWithPhotos {
  id: string;
}


export interface ResponseGlobalRecipes extends ResponseRecipeWithPhotos {
  userId: string;
  likes: number;
  dislikes: number;
}