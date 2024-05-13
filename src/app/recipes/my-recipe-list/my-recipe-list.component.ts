import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { JsonPipe, NgFor } from '@angular/common';
import {
  CurrentRecipeExtended,
  RecipesTableComponent,
} from '../components/recipes-table/recipes-table.component';
import { MyRecipes } from '../models/recipe.model';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { PhotosService } from '../services/photos.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

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
    MatPaginatorModule,
  ],
  templateUrl: './my-recipe-list.component.html',
  styleUrl: './my-recipe-list.component.scss',
})
export class MyRecipeListComponent {
  myList = signal<MyRecipes[]>([]);

  pagination = computed(() => this.myRecipesService.pagination());

  private destroyRef = inject(DestroyRef);

  constructor(
    private myRecipesService: MyRecipesService,
    private photosService: PhotosService,
  ) {
    this.getRecipes();
  }

  onPublish(e: Event, index: number): void {
    e.stopPropagation();

    const recipe = this.myList()[index];
    this.myRecipesService
      .publishRecipe(recipe)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.myList()[index].published = res.published;
      });
  }

  onDelete(e: Event, index: number): void {
    e.stopPropagation();

    const { id } = this.myList()[index];
    this.myRecipesService
      .deleteRecipe(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.myList().splice(index, 1);
      });
  }

  getRecipes(): void {
    this.myRecipesService
      .getRecipes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.myList.set(res);
      });
  }

  getPhotos(current: CurrentRecipeExtended): void {
    if (this.myList()[current.index].photos.length > 0) return;
    this.photosService
      .getPhotos(current.photosAlbumId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photos) => {
        this.myList()[current.index].photos = photos;
      });
  }

  handlePageEvent(e: PageEvent): void {
    this.myRecipesService.pagination.set(e);
    this.getRecipes();
  }
}
