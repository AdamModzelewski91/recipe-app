import {
  Component,
  DestroyRef,
  OnInit,
  ViewChild,
  inject,
  model,
} from '@angular/core';
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
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { DragAndDropComponent } from '../components/drag-and-drop/drag-and-drop.component';
import { forbiddenCharsValidator } from '../../shared/validators/forbidden-chars-validator';
import { MyRecipesService } from '../services/my-recipes.service';
import { NutritionsTableComponent } from '../components/nutritions-table/nutritions-table.component';
import { Photos } from '../models/recipe.model';
import { PhotosService } from '../services/photos.service';
import { IngredientsComponent } from '../components/ingredients/ingredients.component';
import { minLengthArray } from '../../shared/validators/min-length-array';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';

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
    MatIconModule,
    MatTabsModule,
    IngredientsComponent,
    QuillEditorComponent,
    QuillModule,
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss',
})
export class CreateRecipeComponent implements OnInit {
  protected uploadedImages = model<File[]>([]);

  readonly QuillConfiguration = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ align: [] }],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
    ],
  };

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
    ingredients: this.nfb.array<string>(
      [],
      [minLengthArray(2), Validators.required],
    ),
    instructions: ['', Validators.required],
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

  onDeleteIngredient(index: number) {
    this.form.controls.ingredients.removeAt(index);
  }

  onCreateNewIngredient(val: string = ''): void {
    this.form.controls.ingredients.push(
      this.nfb.control(val, [Validators.required]),
    );
  }

  private editRecipe(id: string): void {
    this.idRecipe = id;
    this.myRecipesService
      .getRecipe(id)
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        mergeMap((recipe) => {
          this.photosAlbumId = recipe.photosAlbumId;
          const { ingredients, ...rest } = recipe;
          this.form.reset(rest);
          ingredients.forEach((ing) => {
            this.onCreateNewIngredient(ing);
          });
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
    return result.map((x) => x.id).join('\\|');
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
