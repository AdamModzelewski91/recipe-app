export type Recipe = {
  name: string;
  dish: string;
  difficult: string;
  prepTime: string;
  cookTime: string;
  serves: string;
  nutritions: Nutritions;
};

export type Nutritions = {
  calories: string;
  fat: string;
  carbohydrate: string;
  protein: string;
};

export interface NewRecipe extends Recipe {
  photosAlbumId: string;
  photos: Photos[];
}

export type Photos = {
  name: string;
  img: string;
  id: string;
};

export interface UpdateRecipe extends Recipe {
  id: string;
  removedPhotos: string;
  photos: File[];
  photosAlbumId: string;
}

export interface ResponseUpdateRecipe extends Recipe {
  id: string;
  photos: GetPhotos[];
  photosAlbumId: string;
  published: boolean;
}

export type GetPhotos = {
  originalname: string;
  mimetype: string;
  buffer: string;
  id: string;
};

export interface AddRecipe extends Recipe {
  photos: File[];
}

export interface MyRecipes extends NewRecipe {
  id: string;
  published: boolean;
}

export interface ResponseMyRecipes extends MyRecipes {
  _id: string;
}

export interface GlobalRecipes extends MyRecipes {
  votes: RecipeVotes;
}

export interface ResponseGlobalRecipes extends GlobalRecipes {
  _id: string;
}

export interface RecipeVotes {
  likes: string[];
  dislikes: string[];
}
