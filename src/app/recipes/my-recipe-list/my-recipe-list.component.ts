import { Component, computed } from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { JsonPipe, NgFor } from '@angular/common';
import {
  CurrentPhotoExtended,
  RecipesTableComponent,
} from '../components/recipes-table/recipes-table.component';
import { MyRecipes } from '../models/recipe.type';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  ],
  templateUrl: './my-recipe-list.component.html',
  styleUrl: './my-recipe-list.component.scss',
})
export class MyRecipeListComponent {
  myList = computed<MyRecipes[]>(() => this.myRecipesService.myRecipes());

  constructor(private myRecipesService: MyRecipesService) {}

  onPublish(e: Event, index: number): void {
    e.stopPropagation();

    this.myRecipesService.publishRecipe(index);
  }

  onDelete(e: Event, index: number): void {
    e.stopPropagation();

    this.myRecipesService.deleteRecipe(index);
  }

  getPhotos(current: CurrentPhotoExtended) {
    if (this.myList()[current.index].photos.length > 0) return;
    this.myRecipesService
      .getPhotos(current.photosAlbumId)
      .subscribe(async (photos) => {
        for (let photo of photos) {
          const obj = {
            name: photo.originalname,
            img: `data:${photo.mimetype};base64,` + photo.buffer,
            id: photo.id,
          };

          this.myList()[current.index].photos.push(obj);
        }
      });
  }
}
