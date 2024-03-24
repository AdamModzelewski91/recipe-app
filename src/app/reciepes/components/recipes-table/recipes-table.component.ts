import { Component, input } from '@angular/core';
import { RecipeWithPhotos } from '../../models/recipe.type';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips'; 

@Component({
  selector: 'app-recipes-table',
  standalone: true,
  imports: [MatExpansionModule, MatChipsModule],
  templateUrl: './recipes-table.component.html',
  styleUrl: './recipes-table.component.scss'
})
export class RecipesTableComponent {

  reciepesList = input.required<RecipeWithPhotos[]>();

}
