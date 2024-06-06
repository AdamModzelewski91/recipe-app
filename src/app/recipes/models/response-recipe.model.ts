import {
  CreatedBy,
  GetPhotos,
  GlobalRecipes,
  MyRecipes,
  Recipe,
} from './recipe.model';

export interface ResponseUpdateRecipe extends Recipe {
  id: string;
  photos: GetPhotos[];
  photosAlbumId: string;
  published: boolean;
  createdBy: CreatedBy;
}

export interface ResponseMyRecipes extends MyRecipes {
  _id: string;
}

export interface ResponseGlobalRecipes extends Omit<GlobalRecipes, 'id' | 'photos'> {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
