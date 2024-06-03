import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  signal,
} from '@angular/core';
import { MyRecipesService } from '../services/my-recipes.service';
import { JsonPipe, NgFor } from '@angular/common';
import {
  CurrentRecipeExtended,
  RecipesTableComponent,
} from '../components/recipes-table/recipes-table.component';
import { MyRecipes } from '../models/recipe.model';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { PhotosService } from '../services/photos.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';
import { Observable, switchMap, take, throwError } from 'rxjs';

@Component({
  selector: 'app-my-recipe-list',
  standalone: true,
  imports: [
    NgFor,
    JsonPipe,
    RecipesTableComponent,
    RouterModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatPaginatorModule,
  ],
  templateUrl: './my-recipe-list.component.html',
  styleUrl: './my-recipe-list.component.scss',
})
export class MyRecipeListComponent implements OnInit {
  myList = signal<MyRecipes[]>([]);

  pagination = computed(() => this.myRecipesService.pagination());

  private destroyRef = inject(DestroyRef);

  constructor(
    private myRecipesService: MyRecipesService,
    private photosService: PhotosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getRecipes();
  }

  onPublish(e: Event, index: number): void {
    e.stopPropagation();

    const recipe = this.myList()[index];

    const title = 'Warning';
    const text = `Are you sure that you want to UNPUBLISH your ${recipe.name}? You ll lose all your votes!`;

    if (!recipe.published) {
      this.myRecipesService
        .publishRecipe(recipe)
        .pipe(take(1))
        .subscribe({
          next: (res) => {
            this.myList()[index].published = res.published;
            this.cd.markForCheck();
            this.openSnackBar('Successfully Published!', 'OK');
          },
          error: (err) => this.openSnackBar('Failed to publish!', 'OK'),
        });
    } else {
      this.openDialog(title, text)
        .pipe(
          take(1),
          switchMap((result) => {
            if (!result) return throwError(() => 'canceled');

            return this.myRecipesService.publishRecipe(recipe);
          }),
          take(1),
        )
        .subscribe({
          next: (res) => {
            this.myList()[index].published = res.published;
            this.cd.markForCheck();
            this.openSnackBar('Successfully unpublished!', 'OK');
          },
          error: (err) => {
            if (err !== 'canceled')
              this.openSnackBar('Failed to unpublish!', 'OK');
          },
        });
    }
  }

  onDelete(e: Event, index: number): void {
    e.stopPropagation();

    const { id, name } = this.myList()[index];
    const title = 'Warning';
    const text = `Are you sure that you want DELETE ${name}?`;

    this.openDialog(title, text)
      .pipe(
        take(1),
        switchMap((result) => {
          if (!result) return throwError(() => 'canceled');

          return this.myRecipesService.deleteRecipe(id);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          this.myList().splice(index, 1);
          this.cd.markForCheck();
          this.openSnackBar('Successfully Deleted!', 'OK');
        },
        error: (err) => {
          if (err !== 'canceled') {
            this.openSnackBar('Failed to Delete.', 'OK');
          }
        },
      });
  }

  private openDialog(title: string, text: string): Observable<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title,
        text,
      },
    });

    return dialogRef.afterClosed();
  }

  private openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  getRecipes(): void {
    this.myRecipesService
      .getRecipes()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((res) => {
        this.myList.set(res);
      });
  }

  getPhotos(current: CurrentRecipeExtended): void {
    if (this.myList()[current.index].photos.length > 0) return;
    this.photosService
      .getPhotos(current.photosAlbumId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((photos) => {
        this.myList()[current.index].photos = photos;
        this.cd.markForCheck();
      });
  }

  handlePageEvent(e: PageEvent): void {
    this.myRecipesService.pagination.set(e);
    this.getRecipes();
  }
}
