import { Injectable, signal } from '@angular/core';
import { GetPhotos, GlobalRecipes, RecipeVotes } from '../models/recipe.model';
import { ResponseGlobalRecipes } from '../models/response-recipe.model';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { SkipLoading } from '../../shared/interceptors/loading.interceptor';
import { PageEvent } from '@angular/material/paginator';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class GlobalRecipesService {
  pagination = signal<PageEvent>({
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 10,
    length: 25,
  });

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
      { context: new HttpContext().set(SkipLoading, true) },
    );
  }

  getGlobalList(): Observable<GlobalRecipes[]> {
    return this.http
      .get<{
        recipes: ResponseGlobalRecipes[];
        count: number;
      }>(APIUrl + '/global-recipes')
      .pipe(
        tap((x) => (this.pagination().length = x.count)),
        map((res) =>
          res.recipes.map((x) => ({
            id: x._id,
            name: x.name,
            dish: x.dish,
            difficult: x.difficult,
            prepTime: x.prepTime,
            cookTime: x.cookTime,
            serves: x.serves,
            createdBy: x.createdBy,
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
