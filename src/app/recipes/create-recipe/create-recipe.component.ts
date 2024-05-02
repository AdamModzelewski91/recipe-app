import { JsonPipe } from '@angular/common';
import { Component, DestroyRef, inject, model } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { DragAndDropComponent } from '../components/drag-and-drop/drag-and-drop.component';
import { forbiddenCharsValidator } from '../../shared/validators/forbidden-chars-validator';
import { MyRecipesService } from '../services/my-recipes.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NutritionsTableComponent } from '../components/nutritions-table/nutritions-table.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Photos } from '../models/recipe.type';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    JsonPipe,
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

  photosId!: string;

  form = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50),
      ],
    }),
    dish: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    difficult: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    prepTime: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.max(300),
        forbiddenCharsValidator(/[a-zA-Z]/i),
      ],
    }),
    cookTime: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.max(300),
        forbiddenCharsValidator(/[a-zA-Z]/i),
      ],
    }),
    serves: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.max(24),
        forbiddenCharsValidator(/[a-zA-Z]/i),
      ],
    }),
    nutritions: new FormGroup({
      calories: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.max(9999),
          forbiddenCharsValidator(/[a-zA-Z]/i),
        ],
      }),
      fat: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.max(1000),
          forbiddenCharsValidator(/[a-zA-Z]/i),
        ],
      }),
      carbohydrate: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.max(1000),
          forbiddenCharsValidator(/[a-zA-Z]/i),
        ],
      }),
      protein: new FormControl('', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.max(1000),
          forbiddenCharsValidator(/[a-zA-Z]/i),
        ],
      }),
    }),
  });

  private destroyRef = inject(DestroyRef);

  constructor(
    private router: Router,
    private myRecipesService: MyRecipesService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
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
    const recipe = this.myRecipesService.getRecipe(id);

    if (recipe.photos && recipe.photos?.length > 0) {
      this.photosId = recipe.photosAlbumId;
      this.currentPhotos.set([...recipe.photos]);
    }

    this.form.reset(recipe);
  }

  private getRemovedPhotos(): string {
    const photos: Photos[] = this.myRecipesService.getRecipe(
      this.idRecipe,
    )?.photos;

    const photoIds: string[] = [];
    for (let img of this.currentPhotos()) {
      if (img.id) {
        photoIds.push(img.id);
      }
    }
    const result = photos.filter((item) => !photoIds.includes(item.id));
    return result.map((x) => x.id).join(',');
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    if (this.idRecipe) {
      this.myRecipesService.updateRecipe({
        id: this.idRecipe,
        ...this.form.value,
        removedPhotos: this.getRemovedPhotos(),
        photos: this.uploadedImages(),
        photosAlbumId: this.photosId,
      });
    } else {
      this.myRecipesService.addRecipe({
        ...this.form.value,
        photos: this.uploadedImages(),
      });
    }

    this.router.navigate(['/my-recipes']);
  }

  onResetForm(): void {
    this.form.reset();
    this.uploadedImages.set([]);
  }
}
