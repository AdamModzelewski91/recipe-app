import { Component, computed } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { JsonPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-my-recipe-list',
  standalone: true,
  imports: [NgFor, JsonPipe],
  templateUrl: './my-recipe-list.component.html',
  styleUrl: './my-recipe-list.component.scss'
})
export class MyRecipeListComponent {

  myList = computed(() => this.myRecipesService.myRecipes());

  constructor(private myRecipesService: MyRecipesService) {}
}
