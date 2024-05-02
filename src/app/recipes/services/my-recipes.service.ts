import { Injectable, Signal } from '@angular/core';
import {
  AddRecipe,
  GetPhotos,
  MyRecipes,
  ResponseMyRecipes,
  UpdateRecipe,
} from '../models/recipe.type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MyRecipesService {
  myRecipes: Signal<MyRecipes[]> = toSignal(this.getRecipes(), {
    initialValue: [],
  });

  constructor(private http: HttpClient) {}

  addRecipe(recipe: AddRecipe): void {
    const postData = new FormData();
    this.appendFormData(postData, recipe);

    this.http
      .post<MyRecipes>(APIUrl + '/my-recipes', postData)
      .subscribe((res) => {
        this.myRecipes().push({
          ...recipe,
          ...res,
        });
      });
  }

  getPhotos(id: string): Observable<GetPhotos[]> {
    return this.http.get<GetPhotos[]>(APIUrl + '/photos/' + id);
  }

  updateRecipe(recipe: UpdateRecipe): void {
    const postData = new FormData();
    this.appendFormData(postData, recipe);
    postData.append('removedPhotos', recipe.removedPhotos || '');
    postData.append('photosId', recipe.photosAlbumId);

    this.http
      .put<MyRecipes>(APIUrl + '/my-recipes/' + recipe.id, postData)
      .subscribe((res) => {
        const index = this.myRecipes().findIndex((x) => x.id === res.id);
        this.myRecipes().splice(index, 1, res);
      });
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

  getRecipe(id: string): MyRecipes {
    return this.myRecipes().find((x) => x.id === id) as MyRecipes;
  }

  getRecipes(): Observable<MyRecipes[]> {
    return this.http.get<ResponseMyRecipes[]>(APIUrl + '/my-recipes').pipe(
      map((list) =>
        list.map((x) => ({
          id: x._id,
          name: x.name,
          dish: x.dish,
          difficult: x.difficult,
          prepTime: x.prepTime,
          cookTime: x.cookTime,
          serves: x.serves,
          nutritions: x.nutritions,
          photosAlbumId: x.photosAlbumId,
          photos: [],
          published: x.published,
        })),
      ),
    );
  }

  publishRecipe(index: number): void {
    const recipe = this.myRecipes()[index];

    this.http
      .patch<{ published: boolean }>(APIUrl + '/my-recipes/' + recipe.id, {
        published: !recipe.published,
      })
      .subscribe((res) => {
        this.myRecipes()[index].published = res.published;
      });
  }

  deleteRecipe(index: number): void {
    const recipe = this.myRecipes()[index];

    this.http.delete(APIUrl + '/my-recipes/' + recipe.id).subscribe(() => {
      this.myRecipes().splice(index, 1);
    });
  }
}
