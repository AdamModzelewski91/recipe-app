import { Component, DestroyRef, inject, model } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { mergeMap } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { DragAndDropComponent } from '../components/drag-and-drop/drag-and-drop.component';
import { forbiddenCharsValidator } from '../../shared/validators/forbidden-chars-validator';
import { MyRecipesService } from '../services/my-recipes.service';
import { NutritionsTableComponent } from '../components/nutritions-table/nutritions-table.component';
import { Photos } from '../models/recipe.model';
import { PhotosService } from '../services/photos.service';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    DragAndDropComponent,
    NutritionsTableComponent,
    RouterModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent {
  protected uploadedImages = model<File[]>([]);

  currentPhotos = model<Photos[]>([]);

  idRecipe!: string;

  photos!: Photos[];

  photosAlbumId!: string;

  form = this.nfb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    dish: ['', [Validators.required]],
    difficult: ['', [Validators.required]],
    prepTime: [
      '',
      [
        Validators.required,
        Validators.max(300),
        forbiddenCharsValidator(/[a-zA-Z]/i),
      ],
    ],
    cookTime: [
      '',
      [
        Validators.required,
        Validators.max(300),
        forbiddenCharsValidator(/[a-zA-Z]/i),
      ],
    ],
    serves: [
      '',
      [
        Validators.required,
        Validators.max(24),
        forbiddenCharsValidator(/[a-zA-Z]/i),
      ],
    ],
    nutritions: this.nfb.group({
      calories: [
        '',
        [
          Validators.required,
          Validators.max(9999),
          forbiddenCharsValidator(/[a-zA-Z]/i),
        ],
      ],
      fat: [
        '',
        [
          Validators.required,
          Validators.max(1000),
          forbiddenCharsValidator(/[a-zA-Z]/i),
        ],
      ],
      carbohydrate: [
        '',
        [
          Validators.required,
          Validators.max(1000),
          forbiddenCharsValidator(/[a-zA-Z]/i),
        ],
      ],
      protein: [
        '',
        [
          Validators.required,
          Validators.max(1000),
          forbiddenCharsValidator(/[a-zA-Z]/i),
        ],
      ],
    }),
  });

  private destroyRef = inject(DestroyRef);

  constructor(
    private myRecipesService: MyRecipesService,
    private activatedRoute: ActivatedRoute,
    private photosService: PhotosService,
    private nfb: NonNullableFormBuilder,
  ) {}

  ngOnInit(): void {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe();
    const { id } = this.activatedRoute.snapshot.params;
    if (id) {
      this.editRecipe(id);
    }
  }

  private editRecipe(id: string): void {
    this.idRecipe = id;
    this.myRecipesService
      .getRecipe(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap((recipe) => {
          this.photosAlbumId = recipe.photosAlbumId;
          this.form.reset(recipe);
          return this.photosService.getPhotos(recipe.photosAlbumId);
        }),
      )
      .subscribe((photos) => {
        this.photos = [...photos];
        this.currentPhotos.set(photos);
      });
  }

  private getPhotosIdToRemove(): string {
    const photoIds: string[] = [];
    for (let img of this.currentPhotos()) {
      if (img.id) {
        photoIds.push(img.id);
      }
    }
    const result = this.photos.filter((item) => !photoIds.includes(item.id));
    return result.map((x) => x.id).join(',');
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.idRecipe) {
      this.myRecipesService.updateRecipe({
        id: this.idRecipe,
        ...this.form.getRawValue(),
        removedPhotos: this.getPhotosIdToRemove(),
        photos: this.uploadedImages(),
        photosAlbumId: this.photosAlbumId,
      });
    } else {
      this.myRecipesService.addRecipe({
        ...this.form.getRawValue(),
        photos: this.uploadedImages(),
      });
    }
  }

  onResetForm(): void {
    this.form.reset();
    this.uploadedImages.set([]);
  }
}
