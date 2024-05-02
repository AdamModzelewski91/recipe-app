import { Component, Signal, signal } from '@angular/core';
import { GlobalRecipes } from '../models/recipe.type';
import { GlobalRecipesService } from '../services/global-recipes.service';
import {
  CurrentPhotoExtended,
  RecipesTableComponent,
} from '../components/recipes-table/recipes-table.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { JsonPipe, NgClass } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-global-recipe-list',
  standalone: true,
  imports: [
    RecipesTableComponent,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    JsonPipe,
  ],
  templateUrl: './global-recipe-list.component.html',
  styleUrl: './global-recipe-list.component.scss',
})
export class GlobalRecipeListComponent {
  personId = signal('asdasdasd');

  globalRecipes: Signal<GlobalRecipes[]> = toSignal(
    this.globalRecipesService.getGlobalList(),
    {
      initialValue: [],
    },
  );

  constructor(private globalRecipesService: GlobalRecipesService) {}

  onVote(e: Event, index: number, vote: string) {
    e.stopPropagation();

    this.globalRecipesService
      .voteRecipe(this.globalRecipes()[index].id, vote, this.personId())
      .subscribe((x) => {
        this.globalRecipes()[index].votes = x.votes;
      });
  }

  getPhotos(current: CurrentPhotoExtended) {
    if (this.globalRecipes()[current.index].photos.length > 0) return;
    this.globalRecipesService
      .getPhotos(current.photosAlbumId)
      .subscribe(async (photos) => {
        for (let photo of photos) {
          const obj = {
            name: photo.originalname,
            img: `data:${photo.mimetype};base64,` + photo.buffer,
            id: photo.id,
          };

          this.globalRecipes()[current.index].photos.push(obj);
        }
      });
  }
}
