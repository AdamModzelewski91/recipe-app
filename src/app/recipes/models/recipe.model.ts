export type Recipe = {
  name: string;
  dish: string;
  difficult: string;
  prepTime: string;
  cookTime: string;
  serves: string;
  nutritions: Nutritions;
  ingredients: string[];
  instructions: string;
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
  createdBy: CreatedBy;
}

export type CreatedBy = {
  author: string;
  authorId: string;
};

export interface GlobalRecipes extends MyRecipes {
  votes: RecipeVotes;
}

export interface RecipeVotes {
  likes: string[];
  dislikes: string[];
}
