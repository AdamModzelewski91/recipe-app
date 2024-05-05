import { DestroyRef, Injectable, Signal, inject } from '@angular/core';
import {
  AddRecipe,
  MyRecipes,
  Photos,
  ResponseMyRecipes,
  ResponseUpdateRecipe,
  UpdateRecipe,
} from '../models/recipe.type';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { environment } from '../../../environments/environment';

const APIUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class MyRecipesService {
  myRecipes: Signal<MyRecipes[]> = toSignal(this.getRecipes(), {
    initialValue: [],
  });

  private destroyRef = inject(DestroyRef);

  constructor(private http: HttpClient) {}

  addRecipe(recipe: AddRecipe): void {
    const postData = new FormData();
    this.appendFormData(postData, recipe);

    this.http
      .post<MyRecipes>(APIUrl + '/my-recipes', postData)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.myRecipes().push({
          ...recipe,
          ...res,
        });
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
      .subscribe((res) => {
        const imgs: Photos[] = [];

        for (let photo of res.photos) {
          const obj = {
            name: photo.originalname,
            img: `data:${photo.mimetype};base64,` + photo.buffer,
            id: photo.id,
          };

          imgs.push(obj);
        }

        const index = this.myRecipes().findIndex((x) => x.id === res.id);
        this.myRecipes().splice(index, 1, { ...res, photos: imgs });
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
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.myRecipes()[index].published = res.published;
      });
  }

  deleteRecipe(index: number): void {
    const recipe = this.myRecipes()[index];

    this.http
      .delete(APIUrl + '/my-recipes/' + recipe.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.myRecipes().splice(index, 1);
      });
  }
}
