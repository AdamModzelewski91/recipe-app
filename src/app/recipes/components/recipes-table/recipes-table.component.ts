import {
  Component,
  ContentChild,
  TemplateRef,
  input,
  signal,
} from '@angular/core';
import { GlobalRecipes, MyRecipes } from '../../models/recipe.type';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { nutritions } from '../nutritions-table/nutritions-table.component';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes-table',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatBadgeModule,
    MatChipsModule,
    MatCardModule,
    TitleCasePipe,
    MatButtonModule,
    RouterModule,
    CommonModule,
  ],
  templateUrl: './recipes-table.component.html',
  styleUrl: './recipes-table.component.scss',
})
export class RecipesTableComponent {
  nutritions = signal(nutritions);

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  recipesList = input.required<GlobalRecipes[] | MyRecipes[]>();
}
