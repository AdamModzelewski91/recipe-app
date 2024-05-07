import { Component, DestroyRef, computed, inject } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { JsonPipe, NgFor } from '@angular/common';
import {
  CurrentPhotoExtended,
  RecipesTableComponent,
} from '../components/recipes-table/recipes-table.component';
import { MyRecipes } from '../models/recipe.type';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { PhotosService } from '../services/photos.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-my-recipe-list',
  standalone: true,
  imports: [
    NgFor,
    JsonPipe,
    RecipesTableComponent,
    RouterModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './my-recipe-list.component.html',
  styleUrl: './my-recipe-list.component.scss',
})
export class MyRecipeListComponent {
  myList = computed<MyRecipes[]>(() => this.myRecipesService.myRecipes());

  private destroyRef = inject(DestroyRef);

  constructor(
    private myRecipesService: MyRecipesService,
    private photosService: PhotosService,
  ) {}

  onPublish(e: Event, index: number): void {
    e.stopPropagation();

    this.myRecipesService.publishRecipe(index);
  }

  onDelete(e: Event, index: number): void {
    e.stopPropagation();

    this.myRecipesService.deleteRecipe(index);
  }

  getPhotos(current: CurrentPhotoExtended) {
    if (this.myList()[current.index].photos.length > 0) return;
    this.photosService
      .getPhotos(current.photosAlbumId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photos) => {
        this.myList()[current.index].photos = photos;
      });
  }
}
