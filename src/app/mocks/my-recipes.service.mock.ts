import { signal } from '@angular/core';
import { of } from 'rxjs';

export const MyRecipesServiceMock = jasmine.createSpyObj('MyRecipesService', [
  'addRecipe',
  'updateRecipe',
  'getRecipe',
  'getRecipes',
  'publishRecipe',
  'deleteRecipe',
]);

MyRecipesServiceMock.getRecipes.and.returnValue(of([]));
MyRecipesServiceMock.getRecipe.and.returnValue(of([]));
MyRecipesServiceMock.pagination = signal({
  previousPageIndex: 0,
  pageIndex: 0,
  pageSize: 10,
  length: 25,
});
