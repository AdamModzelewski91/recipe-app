import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { GlobalRecipes } from '../models/recipe.model';
import { GlobalRecipesService } from '../services/global-recipes.service';
import {
  CurrentRecipeExtended,
  RecipesTableComponent,
} from '../components/recipes-table/recipes-table.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { PhotosService } from '../services/photos.service';
import { AuthService } from '../../shared/services/auth.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-global-recipe-list',
  standalone: true,
  imports: [
    RecipesTableComponent,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatChipsModule,
    NgClass,
  ],
  templateUrl: './global-recipe-list.component.html',
  styleUrl: './global-recipe-list.component.scss',
})
export class GlobalRecipeListComponent {
  userId = computed(() => this.authService.userId());

  pagination = computed(() => this.globalRecipesService.pagination());

  globalRecipes = signal<GlobalRecipes[]>([]);

  private destroyRef = inject(DestroyRef);

  constructor(
    private globalRecipesService: GlobalRecipesService,
    private photoService: PhotosService,
    private authService: AuthService,
  ) {
    this.getRecipes();
  }

  onVote(e: Event, index: number, vote: string): void {
    e.stopPropagation();

    this.globalRecipesService
      .voteRecipe(this.globalRecipes()[index].id, vote, this.userId())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((x) => {
        this.globalRecipes()[index].votes = x.votes;
      });
  }

  getRecipes(): void {
    this.globalRecipesService
      .getGlobalList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.globalRecipes.set(res);
      });
  }

  getPhotos(current: CurrentRecipeExtended): void {
    if (this.globalRecipes()[current.index].photos.length > 0) return;
    this.photoService
      .getPhotos(current.photosAlbumId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photos) => {
        this.globalRecipes()[current.index].photos = photos;
      });
  }

  handlePageEvent(e: PageEvent): void {
    this.globalRecipesService.pagination.set(e);
    this.getRecipes();
  }
}
