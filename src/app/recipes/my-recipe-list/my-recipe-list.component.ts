import { Component, computed } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { JsonPipe, NgFor } from '@angular/common';
import { RecipesTableComponent } from '../components/recipes-table/recipes-table.component';
import { MyRecipes } from '../models/recipe.type';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-my-recipe-list',
  standalone: true,
  imports: [
    NgFor,
    JsonPipe,
    RecipesTableComponent,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
  ],
  templateUrl: './my-recipe-list.component.html',
  styleUrl: './my-recipe-list.component.scss',
})
export class MyRecipeListComponent {
  myList = computed<MyRecipes[]>(() => this.myRecipesService.myRecipes());

  constructor(
    private myRecipesService: MyRecipesService,
    private http: HttpClient,
  ) {}

  onPublish(e: Event, index: number): void {
    e.stopPropagation();

    this.myRecipesService.publishRecipe(index);
  }

  onUnpublish(e: Event, index: number): void {
    e.stopPropagation();

    this.myRecipesService.unpublishRecipe(index);
  }

  onDelete(e: Event, index: number): void {
    e.stopPropagation();

    this.myRecipesService.deleteRecipe(index);
  }
}
