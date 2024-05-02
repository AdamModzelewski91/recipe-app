import { Injectable } from '@angular/core';
import {
  GetPhotos,
  GlobalRecipes,
  RecipeVotes,
  ResponseGlobalRecipes,
} from '../models/recipe.type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class GlobalRecipesService {
  constructor(private http: HttpClient) {}

  voteRecipe(
    id: string,
    action: string,
    personId: string,
  ): Observable<{ votes: RecipeVotes }> {
    return this.http.patch<{ votes: RecipeVotes }>(
      APIUrl + '/global-recipes/' + id,
      {
        action,
        personId,
      },
    );
  }

  getGlobalList(): Observable<GlobalRecipes[]> {
    return this.http
      .get<ResponseGlobalRecipes[]>(APIUrl + '/global-recipes')
      .pipe(
        map((recipes) =>
          recipes.map((x) => ({
            id: x._id,
            name: x.name,
            dish: x.dish,
            difficult: x.difficult,
            prepTime: x.prepTime,
            cookTime: x.cookTime,
            serves: x.serves,
            nutritions: x.nutritions,
            photosAlbumId: x?.photosAlbumId,
            photos: [],
            published: x.published,
            votes: x.votes,
          })),
        ),
      );
  }

  getPhotos(id: string): Observable<GetPhotos[]> {
    return this.http.get<GetPhotos[]>(APIUrl + '/photos/' + id);
  }
}
