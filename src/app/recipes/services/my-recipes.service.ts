import { DestroyRef, Injectable, inject, signal } from '@angular/core';
import { AddRecipe, MyRecipes, UpdateRecipe } from '../models/recipe.model';
import {
  ResponseMyRecipes,
  ResponseUpdateRecipe,
} from '../models/response-recipe.model';

import { HttpClient, HttpContext, HttpParams } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';
import { SkipLoading } from '../../shared/interceptors/loading.interceptor';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MyRecipesService {
  private destroyRef = inject(DestroyRef);

  pagination = signal<PageEvent>({
    previousPageIndex: 0,
    pageIndex: 0,
    pageSize: 10,
    length: 25,
  });

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router,
  ) {}

  addRecipe(recipe: AddRecipe): void {
    const postData = new FormData();
    this.appendFormData(postData, recipe);
    postData.append('author', this.auth.nick());
    postData.append('authorId', this.auth.userId());

    this.http
      .post<MyRecipes>(APIUrl + '/my-recipes', postData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.router.navigate(['/my-recipes']);
      });
  }

  updateRecipe(recipe: UpdateRecipe): void {
    const postData = new FormData();
    this.appendFormData(postData, recipe);
    postData.append('removedPhotos', recipe.removedPhotos || '');
    postData.append('photosAlbumId', recipe.photosAlbumId);

    this.http
      .put<ResponseUpdateRecipe>(APIUrl + '/my-recipes/' + recipe.id, postData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }

  private appendFormData(postData: FormData, recipe: AddRecipe): void {
    postData.append('name', recipe.name);
    postData.append('dish', recipe.dish);
    postData.append('difficult', recipe.difficult);
    postData.append('prepTime', recipe.prepTime);
    postData.append('cookTime', recipe.cookTime);
    postData.append('serves', recipe.serves);
    postData.append('nutritions', JSON.stringify(recipe.nutritions));

    if (recipe.photos) {
      for (let photo of recipe.photos) {
        postData.append('photos', photo, photo.name);
      }
    }
  }

  getRecipe(id: string): Observable<MyRecipes> {
    return this.http.get<MyRecipes>(APIUrl + '/my-recipes/' + id);
  }

  getRecipes(): Observable<MyRecipes[]> {
    let params = new HttpParams()
      .set('authorId', this.auth.userId())
      .set('limit', this.pagination().pageSize)
      .set('page', this.pagination().pageIndex);

    return this.http
      .get<{
        recipes: ResponseMyRecipes[];
        count: number;
      }>(APIUrl + '/my-recipes?' + params)
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
            nutritions: x.nutritions,
            createdBy: x.createdBy,
            photosAlbumId: x.photosAlbumId,
            photos: [],
            published: x.published,
          })),
        ),
      );
  }

  publishRecipe(recipe: MyRecipes): Observable<{ published: boolean }> {
    return this.http.patch<{ published: boolean }>(
      APIUrl + '/my-recipes/' + recipe.id,
      {
        published: !recipe.published,
      },
      { context: new HttpContext().set(SkipLoading, true) },
    );
  }

  deleteRecipe(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(APIUrl + '/my-recipes/' + id);
  }
}
