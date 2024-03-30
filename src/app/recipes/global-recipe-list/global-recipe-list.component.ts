import { Component, computed, input, signal } from '@angular/core';
import {
  ResponseGlobalRecipes,
  ResponseRecipeWithPhotos,
} from '../models/recipe.type';
import { GlobalRecipesService } from '../services/global-recipes.service';
import {
  ACTIONS,
  RecipesTableComponent,
} from '../components/recipes-table/recipes-table.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-global-recipe-list',
  standalone: true,
  imports: [RecipesTableComponent, MatBadgeModule, MatButtonModule],
  templateUrl: './global-recipe-list.component.html',
  styleUrl: './global-recipe-list.component.scss',
})
export class GlobalRecipeListComponent {
  globalRecipes = computed<ResponseGlobalRecipes[]>(() =>
    this.globalRecipesService.globalRecipes(),
  );

  actions = ACTIONS;

  constructor(private globalRecipesService: GlobalRecipesService) {}

  onUnpublish(e: Event, index: number) {
    e.stopPropagation();
    this.globalRecipesService.unpublishRecipe(index);
  }

  onLike(e: Event, index: number) {
    e.stopPropagation();
  }

  onDislike(e: Event, index: number) {
    e.stopPropagation();
  }
}
