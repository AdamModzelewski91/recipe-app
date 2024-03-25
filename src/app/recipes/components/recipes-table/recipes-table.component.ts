import { Component, input, signal } from '@angular/core';
import { RecipeWithPhotos } from '../../models/recipe.type';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatChipsModule} from '@angular/material/chips'; 
import { MatCardModule } from '@angular/material/card';
import { nutritions } from '../nutritions-table/nutritions-table.component';
import { TitleCasePipe } from '@angular/common';


@Component({
  selector: 'app-recipes-table',
  standalone: true,
  imports: [MatExpansionModule, MatChipsModule, MatCardModule, TitleCasePipe],
  templateUrl: './recipes-table.component.html',
  styleUrl: './recipes-table.component.scss'
})
export class RecipesTableComponent {

  nutritions = signal(nutritions);

  recipesList = input.required<RecipeWithPhotos[]>();

}
