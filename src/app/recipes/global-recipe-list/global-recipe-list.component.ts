import { Component, computed } from '@angular/core';
import { GlobalRecipes } from '../models/recipe.type';
import { GlobalRecipesService } from '../services/global-recipes.service';
import { RecipesTableComponent } from '../components/recipes-table/recipes-table.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-global-recipe-list',
  standalone: true,
  imports: [
    RecipesTableComponent,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
  ],
  templateUrl: './global-recipe-list.component.html',
  styleUrl: './global-recipe-list.component.scss',
})
export class GlobalRecipeListComponent {
  globalRecipes = computed<GlobalRecipes[]>(() =>
    this.globalRecipesService.globalRecipes(),
  );

  constructor(private globalRecipesService: GlobalRecipesService) {}

  onLike(e: Event, index: number) {
    e.stopPropagation();

    this.globalRecipesService.likeRecipe(index);
  }

  onDislike(e: Event, index: number) {
    e.stopPropagation();

    this.globalRecipesService.dislikeRecipe(index);
  }
}
