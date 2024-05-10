import {
  Component,
  ContentChild,
  EventEmitter,
  Output,
  TemplateRef,
  input,
  signal,
} from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

import { GlobalRecipes, MyRecipes } from '../../models/recipe.model';
import { nutritions } from '../nutritions-table/nutritions-table.component';
import { LoadingBarComponent } from '../../../shared/components/loading-bar/loading-bar.component';

export type CurrentRecipeExtended = {
  index: number;
  photosAlbumId: string;
};

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
    LoadingBarComponent,
  ],
  templateUrl: './recipes-table.component.html',
  styleUrl: './recipes-table.component.scss',
})
export class RecipesTableComponent {
  @Output() onExpend = new EventEmitter<CurrentRecipeExtended>();

  nutritions = signal(nutritions);

  @ContentChild(TemplateRef) itemTemplate!: TemplateRef<any>;

  recipesList = input.required<GlobalRecipes[] | MyRecipes[]>();

  isExpanded(index: number, photosAlbumId: string) {
    this.onExpend.emit({ index, photosAlbumId });
  }
}
