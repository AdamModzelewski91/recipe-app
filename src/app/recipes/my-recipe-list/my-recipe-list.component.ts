import { Component, EventEmitter, computed } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { JsonPipe, NgFor } from '@angular/common';
import {
  ACTIONS,
  RecipesTableComponent,
} from '../components/recipes-table/recipes-table.component';
import { ResponseRecipeWithPhotos } from '../models/recipe.type';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-my-recipe-list',
  standalone: true,
  imports: [
    NgFor,
    JsonPipe,
    RecipesTableComponent,
    RouterModule,
    MatButtonModule,
  ],
  templateUrl: './my-recipe-list.component.html',
  styleUrl: './my-recipe-list.component.scss',
})
export class MyRecipeListComponent {
  myList = computed<ResponseRecipeWithPhotos[]>(() =>
    this.myRecipesService.myRecipes(),
  );

  ACTION = ACTIONS;

  constructor(private myRecipesService: MyRecipesService) {}

  onPublish(e: Event, index: number): void {
    e.stopPropagation();
    this.myRecipesService.publishRecipe(index);
  }

  onDelete(e: Event, index: number): void {
    e.stopPropagation();
    this.myRecipesService.deleteRecipe(index);
  }
}
