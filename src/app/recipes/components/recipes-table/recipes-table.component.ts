import {
  Component,
  ContentChild,
  EventEmitter,
  Output,
  TemplateRef,
  input,
  signal,
} from '@angular/core';
import {
  ResponseGlobalRecipes,
  ResponseRecipeWithPhotos,
} from '../../models/recipe.type';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { nutritions } from '../nutritions-table/nutritions-table.component';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { RouterModule } from '@angular/router';

export enum ACTIONS {
  DELETE = 'delete',
  LIKE = 'like',
  DISLIKE = 'dislike',
  PUBLISH = 'publish',
  UNPUBLISH = 'unpublish',
}

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
  @Output() onAction = new EventEmitter<{ index: number; action: ACTIONS }>();
  actions = ACTIONS;

  nutritions = signal(nutritions);

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  recipesList = input.required<
    ResponseGlobalRecipes[] | ResponseRecipeWithPhotos[]
  >();

  onEmit(e: Event, index: number, action: ACTIONS) {
    e.stopPropagation();

    this.onAction.emit({ index, action });
  }
}
